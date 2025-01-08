import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

interface Setting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: 'notifications';
}

export default function Settings() {
  const [settings, setSettings] = useState<Setting[]>([
    {
      id: '1',
      title: 'Assignment Reminders',
      description: 'Receive notifications about upcoming assignments',
      enabled: true,
      category: 'notifications'
    },
    {
      id: '2',
      title: 'Study Goals',
      description: 'Get updates on your study goal progress',
      enabled: true,
      category: 'notifications'
    },
    {
      id: '3',
      title: 'Wellness Reminders',
      description: 'Receive wellness check-in reminders',
      enabled: false,
      category: 'notifications'
    }
  ]);

  const toggleSetting = (settingId: string) => {
    setSettings(settings.map(setting =>
      setting.id === settingId
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
    const setting = settings.find(s => s.id === settingId);
    if (setting) {
      toast.success(`${setting.title} ${!setting.enabled ? 'enabled' : 'disabled'}`);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold tracking-tight uppercase bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent font-sans mb-2">
          Settings
        </h2>
        <p className="text-lg text-white font-medium uppercase">
          Customize Your Notifications
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="bg-secondary/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {settings
              .filter(setting => setting.category === 'notifications')
              .map(setting => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-lg font-medium text-white">{setting.title}</Label>
                    <p className="text-sm text-gray-300">
                      {setting.description}
                    </p>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => toggleSetting(setting.id)}
                  />
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}