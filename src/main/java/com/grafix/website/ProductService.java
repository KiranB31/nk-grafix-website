package com.grafix.website;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.util.Arrays;

@Service
public class ProductService {
    private final List<Product> products = new ArrayList<>();
    private final String FILE_PATH = "products.json";
    private final ObjectMapper mapper = new ObjectMapper();

    public ProductService() {
        loadProducts();
        if (products.isEmpty()) {
            // Initial mock data if file is empty
            products.add(new Product(UUID.randomUUID().toString(), "Luxury Holographic",
                    "Premium dark slate cards with holographic foil accents.", "$199.00", "/images/card1.png"));
            products.add(new Product(UUID.randomUUID().toString(), "Avant-Garde Neon",
                    "Vibrant, energetic designs for the modern tech era.", "$149.00", "/images/card2.png"));
            saveProducts();
        }
    }

    private void loadProducts() {
        try {
            File file = new File(FILE_PATH);
            if (file.exists()) {
                Product[] loaded = mapper.readValue(file, Product[].class);
                products.clear();
                products.addAll(Arrays.asList(loaded));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void saveProducts() {
        try {
            mapper.writeValue(new File(FILE_PATH), products);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Product> getAllProducts() {
        return products;
    }

    public void addProduct(Product product) {
        if (product.getId() == null || product.getId().isEmpty()) {
            product.setId(UUID.randomUUID().toString());
        }
        products.add(product);
        saveProducts();
    }

    public void deleteProduct(String id) {
        products.removeIf(p -> p.getId().equals(id));
        saveProducts();
    }

    public void updateProduct(Product product) {
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getId().equals(product.getId())) {
                products.set(i, product);
                break;
            }
        }
        saveProducts();
    }

    public Product getProductById(String id) {
        return products.stream().filter(p -> p.getId().equals(id)).findFirst().orElse(null);
    }
}
