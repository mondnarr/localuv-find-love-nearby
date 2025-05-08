
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';

interface Order {
  id: string;
  date: string;
  customer: string;
  items: string[];
  total: number;
  status: string;
}

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
  const columns: Column<Order>[] = [
    {
      header: "Order ID",
      accessor: "id"
    },
    {
      header: "Date",
      accessor: "date"
    },
    {
      header: "Customer",
      accessor: "customer"
    },
    {
      header: "Items",
      cell: (order: Order) => (
        <ul className="list-disc ml-4">
          {order.items.map((item, index) => (
            <li key={index} className="text-sm">{item}</li>
          ))}
        </ul>
      )
    },
    {
      header: "Total",
      accessor: (order: Order) => `$${order.total.toFixed(2)}` as React.ReactNode
    },
    {
      header: "Status",
      cell: (order: Order) => <StatusBadge status={order.status} />
    },
    {
      header: "Actions",
      cell: () => (
        <Button variant="ghost" size="sm">
          Details
        </Button>
      )
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={mockOrders} />
      </CardContent>
    </Card>
  );
};

export default OrdersTab;
