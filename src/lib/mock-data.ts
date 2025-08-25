
export interface Part {
    id: string;
    name: string;
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

export const mockParts: Part[] = [
    { id: 'PART-001', name: 'Air Filter Assembly', mrp: 750.00, sellingPrice: 720.00, stock: 15, image: 'https://images.unsplash.com/photo-1616237225529-67a423329d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwYWlyJTIwZmlsdGVyfGVufDB8fHx8MTc1NjExNDE0NHww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle air filter' },
    { id: 'PART-002', name: 'Clutch Cable', mrp: 350.50, sellingPrice: 330.00, stock: 25, image: 'https://images.unsplash.com/photo-1600863001099-a6a1a153d605?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwY2x1dGNoJTIwY2FibGV8ZW58MHx8fHwxNzU2MTE0MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle clutch cable' },
    { id: 'PART-003', name: 'Brake Pad Set - Front', mrp: 900.00, sellingPrice: 850.00, stock: 3, image: 'https://images.unsplash.com/photo-1609934449767-12b2a6081c5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwYnJha2UlMjBwYWR8ZW58MHx8fHwxNzU2MTE0MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle brake pad' },
    { id: 'PART-004', name: 'Engine Oil (1L)', mrp: 1200.00, sellingPrice: 1150.00, stock: 50, image: 'https://images.unsplash.com/photo-1632386915228-9356d226a655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwZW5naW5lJTIwb2lsfGVufDB8fHx8MTc1NjExNDE5Mnww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle engine oil' },
    { id: 'PART-005', name: 'Spark Plug', mrp: 250.00, sellingPrice: 240.00, stock: 40, image: 'https://images.unsplash.com/photo-1622286392398-690a69365c71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwc3BhcmslMjBwbHVnfGVufDB8fHx8MTc1NjExNDIwN3ww&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle spark plug' },
    { id: 'PART-006', name: 'Chain & Sprocket Kit', mrp: 3500.00, sellingPrice: 3350.00, stock: 8, image: 'https://images.unsplash.com/photo-1593356173010-85d1942a6c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwY2hhaW4lMjBzcHJvY2tldHxlbnwwfHx8fDE3NTYxMTQyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080', imageHint: 'motorcycle chain sprocket' },
];

export const mockBookings: Booking[] = [
    { id: 'BOOK-101', customerName: 'Amit Kumar', customerPhone: '+91 98765 43210', service: 'Regular Servicing', bookingDate: '2024-08-01', status: 'Completed' },
    { id: 'BOOK-102', customerName: 'Sunita Sharma', customerPhone: '+91 87654 32109', service: 'Engine Work', bookingDate: '2024-08-02', status: 'In Progress' },
    { id: 'BOOK-103', customerName: 'Rajesh Verma', customerPhone: '+91 76543 21098', service: 'Oil Change', bookingDate: '2024-08-05', status: 'Pending' },
    { id: 'BOOK-104', customerName: 'Priya Singh', customerPhone: '+91 65432 10987', service: 'Custom Modifications', bookingDate: '2024-08-06', status: 'Pending' },
];
