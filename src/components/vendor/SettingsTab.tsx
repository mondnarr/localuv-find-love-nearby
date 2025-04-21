
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Business Information</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="business-name" className="block text-sm font-medium mb-1">
                  Business Name
                </label>
                <Input id="business-name" defaultValue="Your Business Name" />
              </div>
              <div>
                <label htmlFor="business-description" className="block text-sm font-medium mb-1">
                  Business Description
                </label>
                <textarea 
                  id="business-description" 
                  rows={4}
                  defaultValue="Enter a detailed description of your business..."
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <Input id="phone" defaultValue="(123) 456-7890" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input id="email" defaultValue="your@email.com" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Input id="address" defaultValue="123 Main St" />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium mb-1">
                  Website
                </label>
                <Input id="website" defaultValue="https://yourbusiness.com" />
              </div>
            </div>
          </div>
          <Button className="mt-4">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
