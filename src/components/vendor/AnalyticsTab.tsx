
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Analytics</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Analytics dashboard coming soon!</p>
          <p className="text-sm text-gray-400 mt-2">Track sales, customer engagement and more</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab;
