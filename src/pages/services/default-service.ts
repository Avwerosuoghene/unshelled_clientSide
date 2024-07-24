import axios from "axios";
import { AuthPayload, OrdersPayload } from "../models/payload";
import { NavigateFunction } from "react-router";


const baseUrl = process.env.REACT_APP_BASE_URL;


export class DefaultService {


    public static authenticate = async (authPayload: AuthPayload) => {

        const result = axios.post(`${baseUrl}auth`, authPayload)
        return result;

    };

    public static getSellerOrders = async (getSellerOrdersPayload: OrdersPayload, navigate: NavigateFunction) => {
        const sellerId = sessionStorage.getItem('userData')? JSON.parse(sessionStorage.getItem('userData')!).seller_id : undefined;

        if (sellerId === undefined) {
            navigate('/auth');
        }

        if (!sellerId) {
            throw new Error('No user data found in sessionStorage.');
        }
        const queryParams = {
            sellerId: sellerId,
            sortBy: getSellerOrdersPayload.sortBy,
            currentPage: getSellerOrdersPayload.currentPage,
            itemsPerPage: getSellerOrdersPayload.limit
        }


        const response = await axios.get(`${baseUrl}order_items`, {
            params: queryParams,
        });
        return response;

    };

    public static deleteOrder = async (orderId: string) => {

        const result = axios.delete(`${baseUrl}order_items/${orderId}`)
        return result;

    };

    public static getOrderDetailById = async (orderId: string) => {

        const result = axios.get(`${baseUrl}order_items/${orderId}`)
        return result;

    };


}


