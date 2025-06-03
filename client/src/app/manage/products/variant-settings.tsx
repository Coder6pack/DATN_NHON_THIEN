"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VariantOption {
  id: string;
  name: string;
  values: string[];
}

interface VariantCombination {
  id: string;
  combination: string[];
  price: string;
  available: boolean;
}

export default function Component() {
  const [options, setOptions] = useState<VariantOption[]>([
    {
      id: "1",
      name: "size",
      values: ["s", "m", "l"],
    },
    {
      id: "2",
      name: "color",
      values: ["yellow", "black"],
    },
    {
      id: "3",
      name: "quality",
      values: ["high", "low"],
    },
  ]);

  const [newValueInputs, setNewValueInputs] = useState<{
    [key: string]: string;
  }>({});
  const [editingValue, setEditingValue] = useState<{
    optionId: string;
    valueIndex: number;
  } | null>(null);
  const [editingText, setEditingText] = useState("");

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

    setOptions(
      options.map((option) =>
        option.id === optionId
          ? { ...option, values: [...option.values, newValue] }
          : option
      )
    );
    setNewValueInputs({ ...newValueInputs, [optionId]: "" });
  };

  const removeValue = (optionId: string, valueIndex: number) => {
    setOptions(
      options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              values: option.values.filter((_, index) => index !== valueIndex),
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
    valueIndex: number,
    currentValue: string
  ) => {
    setEditingValue({ optionId, valueIndex });
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
              values: option.values.map((value, index) =>
                index === editingValue.valueIndex ? editingText.trim() : value
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

  // Generate variant combinations
  const generateCombinations = (): VariantCombination[] => {
    if (options.length === 0) return [];

    const combinations: string[][] = [[]];

    for (const option of options) {
      if (option.values.length === 0) continue;
      const newCombinations: string[][] = [];
      for (const combination of combinations) {
        for (const value of option.values) {
          newCombinations.push([...combination, value]);
        }
      }
      combinations.splice(0, combinations.length, ...newCombinations);
    }

    return combinations.map((combo, index) => ({
      id: index.toString(),
      combination: combo,
      price: "",
      available: true,
    }));
  };

  const variants = generateCombinations();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Variant Settings</CardTitle>
          <Button onClick={addOption} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Variant
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {options.map((option) => (
            <div key={option.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <Label
                    htmlFor={`option-${option.id}`}
                    className="text-sm font-medium text-gray-600"
                  >
                    Option name
                  </Label>
                  <Input
                    id={`option-${option.id}`}
                    value={option.name}
                    onChange={(e) =>
                      updateOptionName(option.id, e.target.value)
                    }
                    placeholder="Enter option name"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">
                  Option values
                </Label>
                <div className="mt-2 space-y-2">
                  {option.values.map((value, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      {editingValue?.optionId === option.id &&
                      editingValue?.valueIndex === index ? (
                        <Input
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              saveEdit();
                            } else if (e.key === "Escape") {
                              cancelEdit();
                            }
                          }}
                          onBlur={saveEdit}
                          className="flex-1"
                          autoFocus
                        />
                      ) : (
                        <div
                          className="flex-1 px-3 py-2 border rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => startEditing(option.id, index, value)}
                        >
                          {value}
                        </div>
                      )}
                      <Button
                        onClick={() => removeValue(option.id, index)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="flex items-center gap-2">
                    <Input
                      value={newValueInputs[option.id] || ""}
                      onChange={(e) =>
                        updateNewValueInput(option.id, e.target.value)
                      }
                      placeholder="Add another value"
                      className="flex-1"
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
                      Add
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
                  Delete
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button>Done</Button>
          </div>
        </CardContent>
      </Card>

      {variants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Variant Combinations</span>
              <Button variant="outline" size="sm">
                Expand All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 font-medium text-sm text-gray-600 pb-2 border-b">
                <div>Variant</div>
                <div>Price</div>
                <div>Available</div>
              </div>

              {variants.slice(0, 5).map((variant) => (
                <div
                  key={variant.id}
                  className="grid grid-cols-3 gap-4 items-center py-2"
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
                    <Input placeholder="$0.00" className="w-24" type="number" />
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      defaultChecked={variant.available}
                      className="w-4 h-4"
                    />
                  </div>
                </div>
              ))}

              {variants.length > 5 && (
                <div className="text-sm text-gray-500 pt-2">{`+ ${
                  variants.length - 5
                } more variants`}</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
