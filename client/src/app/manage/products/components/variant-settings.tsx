"use client";

import type React from "react";

import { useState, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, Trash2, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SortableOption } from "./sortable-option";
import { SortableValue } from "./sortable-value";

interface VariantOption {
  id: string;
  name: string;
  values: {
    id: string;
    value: string;
  }[];
}

interface VariantCombination {
  id: string;
  combination: string[];
  price: string;
  available: boolean;
  image?: string;
  quantity: string;
}

export default function VariantSettings() {
  const [options, setOptions] = useState<VariantOption[]>([
    {
      id: "1",
      name: "size",
      values: [
        { id: "size-1", value: "s" },
        { id: "size-2", value: "m" },
        { id: "size-3", value: "l" },
      ],
    },
    {
      id: "2",
      name: "color",
      values: [
        { id: "color-1", value: "yellow" },
        { id: "color-2", value: "black" },
      ],
    },
    {
      id: "3",
      name: "quality",
      values: [
        { id: "quality-1", value: "high" },
        { id: "quality-2", value: "low" },
      ],
    },
  ]);

  const [newValueInputs, setNewValueInputs] = useState<{
    [key: string]: string;
  }>({});
  const [editingValue, setEditingValue] = useState<{
    optionId: string;
    valueId: string;
  } | null>(null);
  const [editingText, setEditingText] = useState("");
  const [expandAll, setExpandAll] = useState(false);
  const [variantImages, setVariantImages] = useState<{ [key: string]: string }>(
    {}
  );
  const [variantQuantities, setVariantQuantities] = useState<{
    [key: string]: string;
  }>({});
  const [variantPrices, setVariantPrices] = useState<{ [key: string]: string }>(
    {}
  );

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addOption = () => {
    const newOption: VariantOption = {
      id: Date.now().toString(),
      name: "",
      values: [],
    };
    setOptions([...options, newOption]);
  };

  const updateOptionName = (optionId: string, name: string) => {
    setOptions(
      options.map((option) =>
        option.id === optionId ? { ...option, name } : option
      )
    );
  };

  const addValue = (optionId: string) => {
    const newValue = newValueInputs[optionId]?.trim();
    if (!newValue) return;

    const valueId = `${optionId}-${Date.now()}`;
    setOptions(
      options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              values: [...option.values, { id: valueId, value: newValue }],
            }
          : option
      )
    );
    setNewValueInputs({ ...newValueInputs, [optionId]: "" });
  };

  const removeValue = (optionId: string, valueId: string) => {
    setOptions(
      options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              values: option.values.filter((val) => val.id !== valueId),
            }
          : option
      )
    );
  };

  const removeOption = (optionId: string) => {
    setOptions(options.filter((option) => option.id !== optionId));
  };

  const updateNewValueInput = (optionId: string, value: string) => {
    setNewValueInputs({ ...newValueInputs, [optionId]: value });
  };

  const startEditing = (
    optionId: string,
    valueId: string,
    currentValue: string
  ) => {
    setEditingValue({ optionId, valueId });
    setEditingText(currentValue);
  };

  const saveEdit = () => {
    if (!editingValue || !editingText.trim()) {
      cancelEdit();
      return;
    }

    setOptions(
      options.map((option) =>
        option.id === editingValue.optionId
          ? {
              ...option,
              values: option.values.map((val) =>
                val.id === editingValue.valueId
                  ? { ...val, value: editingText.trim() }
                  : val
              ),
            }
          : option
      )
    );
    setEditingValue(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingValue(null);
    setEditingText("");
  };

  const handleVariantImageUpload = (
    variantId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setVariantImages({ ...variantImages, [variantId]: imageUrl });
    }
  };

  const removeVariantImage = (variantId: string) => {
    const newImages = { ...variantImages };
    delete newImages[variantId];
    setVariantImages(newImages);
  };

  const updateVariantQuantity = (variantId: string, quantity: string) => {
    setVariantQuantities({ ...variantQuantities, [variantId]: quantity });
  };

  const updateVariantPrice = (variantId: string, price: string) => {
    setVariantPrices({ ...variantPrices, [variantId]: price });
  };

  const handleOptionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOptions((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleValueDragEnd = (event: DragEndEvent, optionId: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOptions((items) => {
      return items.map((option) => {
        if (option.id !== optionId) return option;

        const oldIndex = option.values.findIndex(
          (value) => value.id === active.id
        );
        const newIndex = option.values.findIndex(
          (value) => value.id === over.id
        );
        return {
          ...option,
          values: arrayMove(option.values, oldIndex, newIndex),
        };
      });
    });
  };

  // Generate variant combinations
  const generateCombinations = (): VariantCombination[] => {
    if (options.length === 0) return [];

    const combinations: string[][] = [[]];

    for (const option of options) {
      if (option.values.length === 0) continue;
      const newCombinations: string[][] = [];
      for (const combination of combinations) {
        for (const { value } of option.values) {
          newCombinations.push([...combination, value]);
        }
      }
      combinations.splice(0, combinations.length, ...newCombinations);
    }

    return combinations.map((combo, index) => ({
      id: index.toString(),
      combination: combo,
      price: variantPrices[index.toString()] || "",
      available: true,
      image: variantImages[index.toString()],
      quantity: variantQuantities[index.toString()] || "",
    }));
  };

  const variants = generateCombinations();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Thiết lập biến thể</CardTitle>
          <Button onClick={addOption} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Thêm biến thể
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleOptionDragEnd}
          >
            <SortableContext
              items={options.map((option) => option.id)}
              strategy={verticalListSortingStrategy}
            >
              {options.map((option) => (
                <SortableOption key={option.id} id={option.id}>
                  <div className="flex-1 space-y-4">
                    <div className="flex-1">
                      <Label
                        htmlFor={`option-${option.id}`}
                        className="text-sm font-medium text-gray-600"
                      >
                        Tên biến thể
                      </Label>
                      <Input
                        id={`option-${option.id}`}
                        value={option.name}
                        onChange={(e) =>
                          updateOptionName(option.id, e.target.value)
                        }
                        placeholder="Nhập tên biến thể"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Giá trị biến thể
                      </Label>
                      <div className="mt-2 space-y-2">
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={(event) =>
                            handleValueDragEnd(event, option.id)
                          }
                        >
                          <SortableContext
                            items={option.values.map((val) => val.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            {option.values.map((val) => (
                              <SortableValue key={val.id} id={val.id}>
                                {editingValue?.optionId === option.id &&
                                editingValue?.valueId === val.id ? (
                                  <Input
                                    value={editingText}
                                    onChange={(e) =>
                                      setEditingText(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        saveEdit();
                                      } else if (e.key === "Escape") {
                                        cancelEdit();
                                      }
                                    }}
                                    onBlur={saveEdit}
                                    className="flex-1 bg-background text-foreground"
                                    autoFocus
                                  />
                                ) : (
                                  <div
                                    className="flex-1 px-3 py-2 border rounded-md bg-muted hover:bg-muted/80 cursor-pointer transition-colors"
                                    onClick={() =>
                                      startEditing(option.id, val.id, val.value)
                                    }
                                  >
                                    {val.value}
                                  </div>
                                )}
                                <Button
                                  onClick={() => removeValue(option.id, val.id)}
                                  variant="ghost"
                                  size="sm"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </SortableValue>
                            ))}
                          </SortableContext>
                        </DndContext>

                        <div className="flex items-center gap-2">
                          <Input
                            value={newValueInputs[option.id] || ""}
                            onChange={(e) =>
                              updateNewValueInput(option.id, e.target.value)
                            }
                            placeholder="Thêm giá trị mới"
                            className="flex-1 bg-background text-foreground"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addValue(option.id);
                              }
                            }}
                          />
                          <Button
                            onClick={() => addValue(option.id)}
                            variant="outline"
                            size="sm"
                          >
                            Thêm
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <Button
                        onClick={() => removeOption(option.id)}
                        variant="destructive"
                        size="sm"
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                </SortableOption>
              ))}
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>

      {variants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Danh sách biến thể</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setExpandAll(!expandAll)}
              >
                {expandAll ? "Thu gọn" : "Mở rộng tất cả"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 font-medium text-sm text-gray-600 pb-2 border-b">
                <div>Biến thể</div>
                <div>Giá</div>
                <div>Hình ảnh</div>
                <div>Số lượng</div>
              </div>

              {(expandAll ? variants : variants.slice(0, 5)).map((variant) => (
                <div
                  key={variant.id}
                  className="grid grid-cols-4 gap-4 items-center py-2"
                >
                  <div className="flex flex-wrap gap-1">
                    {variant.combination.map((value, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {value}
                      </Badge>
                    ))}
                  </div>
                  <div>
                    <Input
                      placeholder="₫0"
                      className="w-24"
                      type="number"
                      value={variant.price}
                      onChange={(e) =>
                        updateVariantPrice(variant.id, e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="relative">
                      {variant.image ? (
                        <div className="relative w-16 h-16 border rounded-lg overflow-hidden group">
                          <img
                            src={variant.image || "/placeholder.svg"}
                            alt="Variant"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removeVariantImage(variant.id)}
                            className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div
                          className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                          onClick={() =>
                            fileInputRefs.current[variant.id]?.click()
                          }
                        >
                          <ImagePlus className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <input
                        type="file"
                        ref={(el) => {
                          fileInputRefs.current[variant.id] = el;
                        }}
                        onChange={(e) =>
                          handleVariantImageUpload(variant.id, e)
                        }
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      placeholder="0"
                      className="w-20"
                      type="number"
                      min="0"
                      value={variant.quantity}
                      onChange={(e) =>
                        updateVariantQuantity(variant.id, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}

              {!expandAll && variants.length > 5 && (
                <div className="text-sm text-gray-500 pt-2">{`+ ${
                  variants.length - 5
                } biến thể khác`}</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
