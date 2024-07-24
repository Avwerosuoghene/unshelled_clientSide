import React, { useState, useEffect, useRef } from 'react';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import classes from "./dsahboard.module.scss";
import axios from 'axios';
import { DefaultService } from '../../services/default-service';
import { OrdersPayload } from '../../models/payload';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

const Dashboard: React.FC<any> = () => {
    const [orders, setOrders]: any = useState();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(20);
    const [sortOrder, setSortOrder] = useState<string>('shipping_limit_date');
    const [total, setTotal] = useState<number>(0);
    const loadingBarRef = useRef<LoadingBarRef>(null);
    const navigate = useNavigate();


    const prevValues = useRef({
        currentPage,
        limit,
        sortOrder
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (
            prevValues.current.currentPage !== currentPage ||
            prevValues.current.limit !== limit ||
            prevValues.current.sortOrder !== sortOrder
        ) {
            fetchData();
            prevValues.current = { currentPage, limit, sortOrder };
        }
    }, [currentPage, limit, sortOrder]);



    const fetchData = async () => {
        try {

            const ordersPayload: OrdersPayload = {
                sortBy: sortOrder,
                currentPage,
                limit
            }
            loadingBarRef.current?.continuousStart();
            const response = await DefaultService.getSellerOrders(ordersPayload, navigate);
            loadingBarRef.current?.complete();
            const { data } = response.data;
            setOrders(data.data);
            setTotal(data.total);
        } catch (error) {
            loadingBarRef.current?.complete();
        }
    };

    const handlePageChange = (event: any, value: any) => {
        setCurrentPage(value);
    };

    const handleLimitChange = (event: any) => {
        setLimit(event.target.value);
    };

    const handleSortChange = (event: any) => {
        setSortOrder(event.target.value);
    };


    return (
        <section className={classes["dashboard-container"]}>
            <LoadingBar color="#007bff" ref={loadingBarRef} />

            <header className={classes["header"]}>
                <h1>Orders</h1>
            </header>
            <div className={classes["filters"]}>
                <FormControl variant="outlined" className={classes["form-control"]}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortOrder}
                        onChange={handleSortChange}
                        label="Sort By"
                    >
                        <MenuItem value="shipping_limit_date">Shipping Limit Date</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes["form-control"]}>
                    <InputLabel>Items per Page</InputLabel>
                    <Select
                        value={limit}
                        onChange={handleLimitChange}
                        label="Items per Page"
                    >
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                        <MenuItem value={60}>60</MenuItem>
                        <MenuItem value={80}>80</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={classes["order-list"]}>
                <div className={classes["header-row"]}>
                    <div className={classes["header-item"]}>Order ID</div>
                    <div className={classes["header-item"]}>Product ID</div>
                    <div className={classes["header-item"]}>Price</div>
                    <div className={classes["header-item"]}>Shipping Date</div>
                </div>
                {orders?.length > 0 ? (
                    orders.map((order: any, index: number) => (
                        <Link
                            key={order.order_id + index}
                            to={`../order_details/${order.order_id}`}
                            className={classes["order-item"]}
                        >
                            <div className={classes["order-item-column"]}>{order.order_id}</div>
                            <div className={classes["order-item-column"]}>{order.product_id}</div>
                            <div className={classes["order-item-column"]}>${order.price.toFixed(2)}</div>
                            <div className={classes["order-item-column"]}>${order.shipping_limit_date}</div>
                        </Link>
                    ))
                ) : (
                    <p>No orders available.</p>
                )}
            </div>
            <Pagination
                count={Math.ceil(total / limit)}
                page={currentPage}
                onChange={handlePageChange}
                className={classes["pagination"]}
            />
        </section>
    );

};

export default Dashboard;