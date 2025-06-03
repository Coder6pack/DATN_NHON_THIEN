import { useListCategories } from "@/app/queries/useCategory";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useState } from "react";

export default function MultiSelectCategory({
  value = [],
  onChange,
}: {
  value: number[];
  onChange: (value: number[]) => void;
}) {
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const { data } = useListCategories();
  if (!data) {
    return;
  }
  const categories = data.payload.data;
  const handleAddCategory = (categoryId: string) => {
    const numericId = Number.parseInt(categoryId, 10);
    if (categoryId && !value?.includes(numericId)) {
      onChange([...value, numericId]);
      setCurrentCategory("");
    }
  };

  const removeCategory = (categoryId: number) => {
    onChange(value.filter((id) => id !== categoryId));
  };

  const getSelectedCategoryNames = () => {
    if (!value || !Array.isArray(value)) return [];
    return categories.filter((cat) => value.includes(cat.id));
  };

  const getAvailableCategories = () => {
    if (!value || !Array.isArray(value)) return categories;
    return categories.filter((cat) => !value.includes(cat.id));
  };

  return (
    <div className="space-y-2">
      <Select value={currentCategory} onValueChange={handleAddCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Chọn danh mục..." />
        </SelectTrigger>
        <SelectContent>
          {getAvailableCategories().map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Selected Categories Display */}
      {value.length > 0 && (
        <div className="border rounded-md p-3 bg-muted/30">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Danh mục đã chọn:
          </div>
          <div className="flex flex-wrap gap-2">
            {getSelectedCategoryNames().map((category) => (
              <Badge key={category.id} variant="secondary" className="text-sm">
                {category.name}
                <button
                  type="button"
                  onClick={() => removeCategory(category.id)}
                  className="ml-2 hover:bg-muted rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
