import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import classes from './details.module.scss';
import { DefaultService } from '../../../services/default-service';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

const DetailsPage: React.FC<any> = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<any>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const loadingBarRef = useRef<LoadingBarRef>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            loadingBarRef.current?.continuousStart();
            setLoading(true);
            const response = await DefaultService.getOrderDetailById(orderId!);
            loadingBarRef.current?.complete();
            setLoading(false);
            const data = response.data;

            if (data.isSuccess) {
                setOrder(data.data);
            } else {
            }
        } catch (error) {
            loadingBarRef.current?.complete();
            setLoading(false);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleDelete = async () => {
        try {
            loadingBarRef.current?.continuousStart();
            setLoading(true);
            await DefaultService.deleteOrder(orderId!);

            loadingBarRef.current?.complete();
            setLoading(false);


            navigate('/main');

        } catch (error) {
            loadingBarRef.current?.complete();
            setLoading(false);
        }
    };

    const handleSave = async () => {

    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    if (!order && !loading) {
        return <h5>Not Order found</h5>;
    }

    if (loading) {
        return <h5>Fetching Order Content...</h5>;
    }

    return (

        <section className={classes["details-container"]}>
            <LoadingBar color="#007bff" ref={loadingBarRef} />


            {isEditing ? (
                <div className={classes["edit-form-container"]}>
                    <div className={classes["form-fields"]}>
                        <TextField
                            fullWidth
                            label="Order ID"
                            name="order_id"
                            value={order.order_id}
                            onChange={handleInputChange}
                            margin="normal"
                        />


                        <TextField
                            fullWidth
                            label="Order Item ID"
                            name="order_item_id"
                            type="number"
                            value={order.order_item_id}
                            onChange={handleInputChange}
                            margin="normal"
                        />


                        <TextField
                            fullWidth
                            label="Product ID"
                            name="product_id"
                            value={order.product_id}
                            onChange={handleInputChange}
                            margin="normal"
                        />


                        <TextField
                            fullWidth
                            label="Seller ID"
                            name="seller_id"
                            value={order.seller_id}
                            onChange={handleInputChange}
                            margin="normal"
                        />


                        <TextField
                            fullWidth
                            label="Shipping Limit Date"
                            name="shipping_limit_date"
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            value={order.shipping_limit_date}
                            onChange={handleInputChange}
                            margin="normal"
                        />


                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={order.price}
                            onChange={handleInputChange}
                            margin="normal"
                        />


                        <TextField
                            fullWidth
                            label="Freight Value"
                            name="freight_value"
                            type="number"
                            value={order.freight_value}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </div>


                    <div className={classes["button-container"]}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            className={`${classes["button"]}  ${classes["save"]}`}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="info"
                            onClick={handleEditToggle}
                            className={`${classes["button"]}  ${classes["cancel"]}`}
                        >
                            Cancel
                        </Button>
                    </div>



                </div>
            ) : (
                <div className={classes["item-view-container"]}>
                    <div className={classes["detail-item"]}><p>Order ID: </p> <h4>{order.order_id}</h4></div>
                    <div className={classes["detail-item"]}><p>Order Item ID: </p><h4>{order.order_item_id}</h4></div>
                    <div className={classes["detail-item"]}><p>Product ID: </p><h4>{order.product_id}</h4></div>
                    <div className={classes["detail-item"]}><p>Seller ID: </p><h4>{order.seller_id}</h4></div>
                    <div className={classes["detail-item"]}><p>Shipping Limit Date :</p><h4>{order.shipping_limit_date}</h4></div>
                    <div className={classes["detail-item"]}><p>Price: </p><h4>{order.price}</h4></div>
                    <div className={classes["detail-item"]}><p>Freight Value: </p><h4>{order.freight_value}</h4></div>

                    <div className={classes["button-container"]}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEditToggle}
                            disabled={loading}
                            className={`${classes["button"]} ${classes["edit"]}`}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={handleDelete}
                            disabled={loading}
                            className={`${classes["button"]}  ${classes["delete"]}`}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default DetailsPage;