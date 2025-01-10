import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Link as LinkIcon, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface StudyMaterial {
  id: string;
  title: string;
  url: string;
  category: string;
}

export default function StudyMaterials() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [newMaterial, setNewMaterial] = useState({ title: "", url: "", category: "" });

  const addMaterial = () => {
    if (newMaterial.title && newMaterial.url) {
      setMaterials([...materials, { ...newMaterial, id: Date.now().toString() }]);
      setNewMaterial({ title: "", url: "", category: "" });
      toast.success("Study material added successfully");
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const deleteMaterial = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id));
    toast.success("Study material removed");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Study Materials</h2>
      <Card className="bg-secondary/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Add Study Material</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Input
              placeholder="Title"
              value={newMaterial.title}
              onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
            />
            <Input
              placeholder="URL"
              value={newMaterial.url}
              onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
            />
            <Input
              placeholder="Category (Optional)"
              value={newMaterial.category}
              onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
            />
            <Button onClick={addMaterial} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Material
            </Button>
          </div>

          {materials.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-white">Your Study Materials</h3>
              <div className="grid gap-4">
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between bg-secondary/30 p-4 rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-red-400" />
                        <span className="font-medium text-white">{material.title}</span>
                      </div>
                      {material.category && (
                        <span className="text-sm text-gray-400">{material.category}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <a href={material.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMaterial(material.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}