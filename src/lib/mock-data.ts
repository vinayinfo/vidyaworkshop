
export interface Product {
    id: string;
    name: string;
    category: 'Part' | 'Accessory';
    mrp: number;
    sellingPrice: number;
    stock: number;
    image: string;
    imageHint: string;
}

export interface Booking {
    id: string;
    customerName: string;
    customerPhone: string;
    service: string;
    bookingDate: string;
    status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
}

export interface Expense {
    id: string;
    name: string;
    category: 'Rent' | 'Salary' | 'Utilities' | 'Marketing' | 'Miscellaneous';
    amount: number;
    date: string;
}


export const mockProducts: Product[] = [
    { id: 'PART-001', name: 'Air Filter Assembly', category: 'Part', mrp: 750.00, sellingPrice: 720.00, stock: 15, image: 'https://images.unsplash.com/photo-1616237225529-67a423329d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwYWlyJTIwZmlsdGVyfGVufDB8fHx8MTc1NjExNDE0NHww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle air filter' },
    { id: 'PART-002', name: 'Clutch Cable', category: 'Part', mrp: 350.50, sellingPrice: 330.00, stock: 25, image: 'https://images.unsplash.com/photo-1600863001099-a6a1a153d605?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwY2x1dGNoJTIwY2FibGV8ZW58MHx8fHwxNzU2MTE0MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle clutch cable' },
    { id: 'PART-003', name: 'Brake Pad Set - Front', category: 'Part', mrp: 900.00, sellingPrice: 850.00, stock: 3, image: 'https://images.unsplash.com/photo-1609934449767-12b2a6081c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwYnJha2UlMjBwYWR8ZW58MHx8fHwxNzU2MTE0MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle brake pad' },
    { id: 'PART-004', name: 'Engine Oil (1L)', category: 'Part', mrp: 1200.00, sellingPrice: 1150.00, stock: 50, image: 'https://images.unsplash.com/photo-1632386915228-9356d226a655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwZW5naW5lJTIwb2lsfGVufDB8fHx8MTc1NjExNDE5Mnww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle engine oil' },
    { id: 'PART-005', name: 'Spark Plug', category: 'Part', mrp: 250.00, sellingPrice: 240.00, stock: 40, image: 'https://images.unsplash.com/photo-1622286392398-690a69365c71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwc3BhcmslMjBwbHVnfGVufDB8fHx8MTc1NjExNDIwN3ww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle spark plug' },
    { id: 'PART-006', name: 'Chain & Sprocket Kit', category: 'Part', mrp: 3500.00, sellingPrice: 3350.00, stock: 8, image: 'https://images.unsplash.com/photo-1593356173010-85d1942a6c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwY2hhaW4lMjBzcHJvY2tldHxlbnwwfHx8fDE3NTYxMTQyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle chain sprocket' },
    { id: 'ACC-001', name: 'Riding Gloves', category: 'Accessory', mrp: 2500.00, sellingPrice: 2200.00, stock: 20, image: 'https://images.unsplash.com/photo-1581605415337-a9e9e5a66a6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwZ2xvdmVzfGVufDB8fHx8MTc1NjE5NzU4Nnww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle gloves' },
    { id: 'ACC-002', name: 'Motorcycle Helmet', category: 'Accessory', mrp: 4500.00, sellingPrice: 4250.00, stock: 12, image: 'https://images.unsplash.com/photo-1599573887640-551cf739343a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwaGVsbWV0fGVufDB8fHx8MTc1NjE5NzYwNnww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle helmet' },
    { id: 'PART-007', name: 'Headlight Bulb', category: 'Part', mrp: 400.00, sellingPrice: 380.00, stock: 2, image: 'https://placehold.co/400x400.png', imageHint: 'headlight bulb' },
    { id: 'PART-008', name: 'Indicator Set', category: 'Part', mrp: 800.00, sellingPrice: 750.00, stock: 4, image: 'https://placehold.co/400x400.png', imageHint: 'motorcycle indicator' },
    { id: 'PART-009', name: 'Rear Brake Shoes', category: 'Part', mrp: 450.00, sellingPrice: 420.00, stock: 1, image: 'https://placehold.co/400x400.png', imageHint: 'brake shoes' },
    { id: 'PART-010', name: 'Handlebar Grips', category: 'Accessory', mrp: 300.00, sellingPrice: 280.00, stock: 3, image: 'https://placehold.co/400x400.png', imageHint: 'handlebar grips' },
    { id: 'PART-011', name: 'Fork Oil (500ml)', category: 'Part', mrp: 500.00, sellingPrice: 480.00, stock: 4, image: 'https://placehold.co/400x400.png', imageHint: 'fork oil' },
    { id: 'PART-012', name: 'Battery (12V)', category: 'Part', mrp: 2800.00, sellingPrice: 2700.00, stock: 2, image: 'https://placehold.co/400x400.png', imageHint: 'motorcycle battery' },
    { id: 'ACC-003', name: 'Bike Cover', category: 'Accessory', mrp: 1200.00, sellingPrice: 1100.00, stock: 1, image: 'https://placehold.co/400x400.png', imageHint: 'bike cover' },
    { id: 'PART-013', name: 'Oil Filter', category: 'Part', mrp: 200.00, sellingPrice: 180.00, stock: 4, image: 'https://placehold.co/400x400.png', imageHint: 'oil filter' },
    { id: 'PART-014', name: 'Accelerator Cable', category: 'Part', mrp: 250.00, sellingPrice: 230.00, stock: 3, image: 'https://placehold.co/400x400.png', imageHint: 'accelerator cable' },
    { id: 'PART-015', name: 'Wheel Bearing Set', category: 'Part', mrp: 600.00, sellingPrice: 550.00, stock: 2, image: 'https://placehold.co/400x400.png', imageHint: 'wheel bearing' },
    { id: 'PART-016', name: 'Gasket Kit', category: 'Part', mrp: 800.00, sellingPrice: 750.00, stock: 1, image: 'https://placehold.co/400x400.png', imageHint: 'gasket kit' },
    { id: 'ACC-004', name: 'Tank Pad', category: 'Accessory', mrp: 400.00, sellingPrice: 350.00, stock: 4, image: 'https://placehold.co/400x400.png', imageHint: 'tank pad' },
    { id: 'PART-017', name: 'Fuse Set', category: 'Part', mrp: 100.00, sellingPrice: 90.00, stock: 3, image: 'https://placehold.co/400x400.png', imageHint: 'fuse set' },
    { id: 'PART-018', name: 'Mirror Set', category: 'Part', mrp: 900.00, sellingPrice: 850.00, stock: 2, image: 'https://placehold.co/400x400.png', imageHint: 'motorcycle mirror' },
    { id: 'PART-019', name: 'Horn', category: 'Part', mrp: 550.00, sellingPrice: 520.00, stock: 1, image: 'https://placehold.co/400x400.png', imageHint: 'motorcycle horn' },
    { id: 'PART-020', name: 'Tyre Tube - Rear', category: 'Part', mrp: 650.00, sellingPrice: 620.00, stock: 4, image: 'https://placehold.co/400x400.png', imageHint: 'tyre tube' },
    { id: 'PART-021', name: 'Lock Set', category: 'Part', mrp: 1500.00, sellingPrice: 1400.00, stock: 3, image: 'https://placehold.co/400x400.png', imageHint: 'lock set' },
    { id: 'ACC-005', name: 'Saddlebags', category: 'Accessory', mrp: 5500.00, sellingPrice: 5200.00, stock: 2, image: 'https://placehold.co/400x400.png', imageHint: 'saddlebags' },
    { id: 'PART-022', name: 'Muffler Gasket', category: 'Part', mrp: 150.00, sellingPrice: 140.00, stock: 4, image: 'https://placehold.co/400x400.png', imageHint: 'muffler gasket' },
    { id: 'PART-023', name: 'Valve Set', category: 'Part', mrp: 700.00, sellingPrice: 650.00, stock: 1, image: 'https://placehold.co/400x400.png', imageHint: 'valve set' }
];

export const mockBookings: Booking[] = [
    { id: 'BOOK-101', customerName: 'Amit Kumar', customerPhone: '+91 98765 43210', service: 'Regular Servicing', bookingDate: '2024-08-01', status: 'Completed' },
    { id: 'BOOK-102', customerName: 'Sunita Sharma', customerPhone: '+91 87654 32109', service: 'Engine Work', bookingDate: '2024-08-02', status: 'In Progress' },
    { id: 'BOOK-103', customerName: 'Rajesh Verma', customerPhone: '+91 76543 21098', service: 'Oil Change', bookingDate: '2024-08-05', status: 'Pending' },
    { id: 'BOOK-104', customerName: 'Priya Singh', customerPhone: '+91 65432 10987', service: 'Custom Modifications', bookingDate: '2024-08-06', status: 'Pending' },
];

export const mockDailySales = [
  { name: "Sun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mon", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Tue", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Wed", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Thu", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Fri", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sat", total: Math.floor(Math.random() * 5000) + 1000 },
];

export const mockExpenses: Expense[] = [
    { id: 'EXP-001', name: 'Workshop Rent', category: 'Rent', amount: 50000, date: '2024-07-01' },
    { id: 'EXP-002', name: 'July Salaries', category: 'Salary', amount: 120000, date: '2024-07-05' },
    { id: 'EXP-003', name: 'Electricity Bill', category: 'Utilities', amount: 8500, date: '2024-07-10' },
    { id: 'EXP-004', name: 'Team Breakfast', category: 'Miscellaneous', amount: 2500, date: '2024-07-15' },
];
