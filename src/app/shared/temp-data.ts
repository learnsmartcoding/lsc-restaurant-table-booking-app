export const AppSampleData = {
    restaurants: [
        {
            id: 1,
            name: "Tasty Bistro",
            address: "456 Oak Avenue",
            phone: "555-123-4567",
            email: "info@tastybistro.com",
            imageUrl: "https://example.com/tasty-bistro.jpg",
        },
        {
            id: 2,
            name: "Pizza Paradise",
            address: "789 Elm Street",
            phone: "555-987-6543",
            email: "info@pizzaparadise.com",
            imageUrl: "https://example.com/pizza-paradise.jpg",
        },
        {
            id: 3,
            name: "Sushi Sensation",
            address: "321 Maple Road",
            phone: "555-567-8901",
            email: "info@sushisensation.com",
            imageUrl: "https://example.com/sushi-sensation.jpg",
        },
        {
            id: 4,
            name: "Burger Barn",
            address: "567 Pine Lane",
            phone: "555-456-7890",
            email: "info@burgerbarn.com",
            imageUrl: "https://example.com/burger-barn.jpg",
        },
        {
            id: 5,
            name: "Cafe Delights",
            address: "789 Cherry Street",
            phone: "555-234-5678",
            email: "info@cafedelights.com",
            imageUrl: "https://example.com/cafe-delights.jpg",
        },
    ],
    restaurantBranches: [
        // Restaurant 1 branches
        {
            id: 1,
            restaurantId: 1, // Assuming restaurantId 1 corresponds to the first restaurant in the list
            name: "Branch A",
            address: "123 Oak Street",
            phone: "555-111-1111",
            email: "brancha@example.com",
            imageUrl: "https://example.com/branch-a.jpg",
        },
        {
            id: 2,
            restaurantId: 1, // Assuming restaurantId 1 corresponds to the first restaurant in the list
            name: "Branch B",
            address: "456 Maple Avenue",
            phone: "555-222-2222",
            email: "branchb@example.com",
            imageUrl: "https://example.com/branch-b.jpg",
        },

        // Restaurant 2 branches
        {
            id: 3,
            restaurantId: 2, // Assuming restaurantId 2 corresponds to the second restaurant in the list
            name: "Branch X",
            address: "789 Pine Road",
            phone: "555-333-3333",
            email: "branchx@example.com",
            imageUrl: "https://example.com/branch-x.jpg",
        },
        {
            id: 4,
            restaurantId: 2, // Assuming restaurantId 2 corresponds to the second restaurant in the list
            name: "Branch Y",
            address: "101 Elm Lane",
            phone: "555-444-4444",
            email: "branchy@example.com",
            imageUrl: "https://example.com/branch-y.jpg",
        },

        // Restaurant 3 branches
        {
            id: 5,
            restaurantId: 3, // Assuming restaurantId 3 corresponds to the third restaurant in the list
            name: "Branch M",
            address: "111 Cherry Street",
            phone: "555-555-5555",
            email: "branchm@example.com",
            imageUrl: "https://example.com/branch-m.jpg",
        }
    ]
}