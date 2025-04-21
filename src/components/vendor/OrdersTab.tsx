
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const mockOrders = [
  {
    id: 'ord-001',
    date: '2023-04-15',
    customer: 'John Smith',
    items: ['Handcrafted Coffee Mug (2)', 'Local Honey 8oz (1)'],
    total: 61.98,
    status: 'Shipped'
  },
  {
    id: 'ord-002',
    date: '2023-04-14',
    customer: 'Sarah Johnson',
    items: ['Organic Lavender Soap (3)'],
    total: 25.50,
    status: 'Processing'
  },
  {
    id: 'ord-003',
    date: '2023-04-10',
    customer: 'Mike Williams',
    items: ['Local Honey 8oz (2)'],
    total: 24.00,
    status: 'Delivered'
  }
];

const OrdersTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Items</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">
                    <ul className="list-disc ml-4">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersTab;
