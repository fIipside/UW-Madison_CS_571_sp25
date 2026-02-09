import { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

import CS571 from '@cs571/mobile-client'

export default function BadgerMart() {
    // Task 1
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw7/items", {
            headers: {
                "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7"
            }
        })
        .then(res => res.json())
        .then(data => {
            setItems(data);
            const initialBasket = {};
            data.forEach(item => {
                initialBasket[item.name] = 0;
            });
            setBasket(initialBasket);
            console.log(data);
        })
    }, []);

    // Task 2
    const [page, setPage] = useState(0);
    const ITEMS_PER_PAGE = 1;
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const currentItems = items.slice(start, end);

    // Task 3
    const [basket, setBasket] = useState({});

    const increment = (name) => {
        setBasket(prev => ({
            ...prev,
            [name]: prev[name] + 1
        }));
    };

    const decrement = (name) => {
        setBasket(prev => ({
            ...prev,
            [name]: prev[name] - 1
        }));
    };

    // Task 4
    const totalItems = Object.values(basket).reduce((sum, count) => sum + count, 0);
    const totalCost = items.reduce((sum, item) => {
        const count = basket[item.name] || 0;
        return sum + count * item.price;
    }, 0);

    // Task 5
    const placeOrder = () => {
        Alert.alert(
            "Order Confirmed!",
            `Your order contains ${totalItems} items and would have costs $${totalCost.toFixed(2)}!`
        );

        const resetBasket = {};
        items.forEach(item => {
            resetBasket[item.name] = 0;
        });
        setBasket(resetBasket);

        setPage(0);
    };

    return (
        <View>
            <Text style={{ fontSize: 28 }}>
                Welcome to Badger Mart!
            </Text>

            {/* Task 2 */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5, marginHorizontal: 90 }}>
                <Button
                    title="Previous"
                    onPress={() => setPage(page - 1)}
                    disabled={page === 0}
                />
                <Button
                    title="Next"
                    onPress={() => setPage(page + 1)}
                    disabled={end >= items.length}
                />
            </View>

            {/* Task 1, 3 */}
            {currentItems.map(item => (
                <BadgerSaleItem
                    key={item.name}
                    item={item}
                    count={basket[item.name] || 0}
                    onAdd={increment}
                    onRemove={decrement}
                />
            ))}

            {/* Task 4 */}
            <View>
                <Text style={{ textAlign: "center", fontSize: 16, marginVertical: 10 }}>
                    You have {totalItems} item(s) costing ${totalCost.toFixed(2)} in your cart!
                </Text>
            </View>

            {/* Task 5 */}
            <View style={{ marginHorizontal: 100, justifyContent: "space-between", marginVertical: 10 }}>
                <Button
                    title="Place Order"
                    onPress={placeOrder}
                    disabled={totalItems === 0}
                />
            </View>
        </View>
    );
}
