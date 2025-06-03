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
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, ImagePlus, Trash2, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import RichTextEditor from "./components/rich-text-editor";
import { SortableImage } from "./components/sortable-image";
import VariantSettings from "./components/variant-settings";
import { Form, FormProvider, useForm } from "react-hook-form";
import {
  CreateProductBodySchema,
  CreateProductBodyType,
} from "@/schemaValidations/product.model";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import MultiSelectCategory from "./components/mutil-select";

interface ProductImage {
  id: string;
  url: string;
  file: File;
}
const brands = [
  { id: "1", name: "Nike" },
  { id: "2", name: "Adidas" },
  { id: "3", name: "Apple" },
  { id: "4", name: "Samsung" },
  { id: "5", name: "Sony" },
  { id: "6", name: "LG" },
  { id: "7", name: "Xiaomi" },
  { id: "8", name: "Panasonic" },
  { id: "9", name: "Philips" },
  { id: "10", name: "Zara" },
];

// Main Dialog Component
export default function AddProduct() {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [images, setImages] = useState<ProductImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBodySchema),
    defaultValues: {
      name: "",
      description: "",
      basePrice: 0,
      virtualPrice: 0,
      brandId: undefined,
      categories: undefined,
      images: undefined,
      skus: undefined,
      variants: undefined,
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: ProductImage[] = Array.from(e.target.files).map(
        (file) => ({
          id: Math.random().toString(36).substring(2, 11),
          url: URL.createObjectURL(file),
          file: file,
        })
      );

      setImages([...images, ...newImages]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newImages: ProductImage[] = Array.from(e.dataTransfer.files).map(
        (file) => ({
          id: Math.random().toString(36).substring(2, 11),
          url: URL.createObjectURL(file),
          file: file,
        })
      );

      setImages([...images, ...newImages]);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const toggleImageSelection = (id: string) => {
    const newSelected = new Set(selectedImages);

    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }

    setSelectedImages(newSelected);
  };

  const deleteSelectedImages = () => {
    setImages(images.filter((image) => !selectedImages.has(image.id)));
    setSelectedImages(new Set());
  };

  const handleSuccess = () => {
    setOpen(false);
    console.log("Product saved successfully!");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader>
          <DialogTitle>Create product</DialogTitle>
          <DialogDescription>
            Field name, image, price is require
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-80px)]">
          <div className="px-6 py-4">
            <FormProvider {...form}>
              <form id="add-product-form" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="name">Name</Label>
                            <div>
                              <Input
                                id="name"
                                {...field}
                                placeholder="Input name of product"
                                required
                              />
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="description">Description</Label>
                            <RichTextEditor
                              content={field.value}
                              onChange={field.onChange}
                              placeholder="Input description"
                            />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="categories"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Danh mục</FormLabel>
                              <FormControl>
                                <MultiSelectCategory
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="brand">Thương hiệu</Label>
                        <Select value={brand} onValueChange={setBrand}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn thương hiệu" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands.map((b) => (
                              <SelectItem key={b.id} value={b.id}>
                                {b.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="regular-price">Giá gốc</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            ₫
                          </span>
                          <Input
                            id="regular-price"
                            type="number"
                            value={regularPrice}
                            onChange={(e) => setRegularPrice(e.target.value)}
                            placeholder="0"
                            className="pl-7"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sale-price">Giá bán</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            ₫
                          </span>
                          <Input
                            id="sale-price"
                            type="number"
                            value={salePrice}
                            onChange={(e) => setSalePrice(e.target.value)}
                            placeholder="0"
                            className="pl-7"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hình ảnh sản phẩm */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hình ảnh sản phẩm</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Quản lý hình ảnh</h3>
                      <div className="flex gap-2">
                        {selectedImages.size > 0 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={deleteSelectedImages}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Xóa ({selectedImages.size})
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <ImagePlus className="w-4 h-4 mr-2" />
                          Thêm ảnh
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          multiple
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div
                      className="border-2 border-dashed rounded-lg p-6 text-center"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      {images.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32">
                          <ImagePlus className="w-8 h-8 text-gray-300 mb-2" />
                          <p className="text-sm text-gray-500">
                            Kéo thả hình ảnh vào đây hoặc click để chọn
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Chọn hình ảnh
                          </Button>
                        </div>
                      ) : (
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={handleDragEnd}
                        >
                          <SortableContext
                            items={images.map((img) => img.id)}
                            strategy={rectSortingStrategy}
                          >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {images.map((image, index) => (
                                <SortableImage
                                  key={image.id}
                                  id={image.id}
                                  url={image.url}
                                  isFirst={index === 0}
                                  isSelected={selectedImages.has(image.id)}
                                  onSelect={() =>
                                    toggleImageSelection(image.id)
                                  }
                                />
                              ))}

                              {/* Upload New Image Placeholder */}
                              <div
                                className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer hover:border-gray-400 transition-colors aspect-square"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <ImagePlus className="w-6 h-6 text-gray-400 mb-1" />
                                <span className="text-xs text-gray-500 text-center">
                                  Thêm ảnh
                                </span>
                              </div>
                            </div>
                          </SortableContext>
                        </DndContext>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Biến thể sản phẩm */}
                <Card>
                  <CardHeader>
                    <CardTitle>Biến thể sản phẩm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <VariantSettings />
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button type="button" variant="outline">
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Đang lưu..." : "Lưu sản phẩm"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="add-product-form">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
