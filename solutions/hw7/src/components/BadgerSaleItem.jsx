import { Text, View, Image, Button } from "react-native";

export default function BadgerSaleItem({ item, count, onAdd, onRemove }) {
    // Task 1
    const { name, price, imgSrc, upperLimit } = item;

    return (
        <View style={{alignItems: 'center'}}>
            <Image
                source={{ uri: imgSrc }}
                style={{ width: 200, height: 200}}
                resizeMode="contain"
            />
            <Text style={{ fontSize: 28, marginVertical: 5}}>{name}</Text>
            <Text style={{ fontSize: 20, marginVertical: 5}}>${price.toFixed(2)} each</Text>
            <Text style={{ fontSize: 16, marginVertical: 5}}>You can order up to {upperLimit} units!</Text>

            {/* Task 3 */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 5 }}>
                <Button
                    title="-"
                    onPress={() => onRemove(name)}
                    disabled={count === 0}
                />
                <Text style={{ marginHorizontal: 12, fontSize: 18 }}>
                    {count}
                </Text>
                <Button
                    title="+"
                    onPress={() => onAdd(name)}
                    disabled={count === upperLimit}
                />
            </View>

        </View>
    );
}
