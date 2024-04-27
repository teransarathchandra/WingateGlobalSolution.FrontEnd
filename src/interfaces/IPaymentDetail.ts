export interface IPaymentDetail {
    payment_id: number;
    order_id: string;
    date: string;
    description: string;
    status: string;
    currency: string;
    amount: number;
    customer: {
        fist_name: string;
        last_name: string;
        email: string;
        phone: string;
        delivery_details: {
            address: string;
            city: string;
            country: string;
        };
    };
    amount_detail: {
        currency: string;
        gross: number;
        fee: number;
        net: number;
        exchange_rate: number;
        exchange_from: string;
        exchange_to: string;
    };
    payment_method: {
        method: string;
        card_customer_name: string;
        card_no: string;
    };
    items: Array<{
        name: string;
        quantity: number;
        currency: string;
        unit_price: number;
        total_price: number;
    }>;
    request: {
        custom1: string | null;
        custom2: string | null;
    };
}