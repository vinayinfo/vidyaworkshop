export interface Part {
    id: string;
    name: string;
    mrp: number;
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
    { id: 'PART-001', name: 'Air Filter Assembly', mrp: 750.00, stock: 15, image: 'https://placehold.co/300x300.png', imageHint: 'air filter' },
    { id: 'PART-002', name: 'Clutch Cable', mrp: 350.50, stock: 25, image: 'https://placehold.co/300x300.png', imageHint: 'clutch cable' },
    { id: 'PART-003', name: 'Brake Pad Set - Front', mrp: 900.00, stock: 3, image: 'https://placehold.co/300x300.png', imageHint: 'brake pad' },
    { id: 'PART-004', name: 'Engine Oil (1L)', mrp: 1200.00, stock: 50, image: 'https://placehold.co/300x300.png', imageHint: 'engine oil' },
    { id: 'PART-005', name: 'Spark Plug', mrp: 250.00, stock: 40, image: 'https://placehold.co/300x300.png', imageHint: 'spark plug' },
    { id: 'PART-006', name: 'Chain & Sprocket Kit', mrp: 3500.00, stock: 8, image: 'https://placehold.co/300x300.png', imageHint: 'chain sprocket' },
];

export const mockBookings: Booking[] = [
    { id: 'BOOK-101', customerName: 'Amit Kumar', customerPhone: '+91 98765 43210', service: 'Regular Servicing', bookingDate: '2024-08-01', status: 'Completed' },
    { id: 'BOOK-102', customerName: 'Sunita Sharma', customerPhone: '+91 87654 32109', service: 'Engine Work', bookingDate: '2024-08-02', status: 'In Progress' },
    { id: 'BOOK-103', customerName: 'Rajesh Verma', customerPhone: '+91 76543 21098', service: 'Oil Change', bookingDate: '2024-08-05', status: 'Pending' },
    { id: 'BOOK-104', customerName: 'Priya Singh', customerPhone: '+91 65432 10987', service: 'Custom Modifications', bookingDate: '2024-08-06', status: 'Pending' },
];
