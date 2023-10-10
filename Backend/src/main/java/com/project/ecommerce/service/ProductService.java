package com.project.ecommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.ecommerce.domain.Product;

@Service
public interface ProductService {
    // Hàm thêm sản phẩm
    public Product addProduct(Product product);

    // Hàm chỉnh sửa thông tin sản phẩm
    public Product updateProduct(int id, Product product);

    // Hàm xóa sản phẩm
    public boolean deleteProduct(int id);

    // Hàm lấy ra danh sách tất cả sản phẩm
    public List<Product> getAllProduct();

    // Hàm lấy ra 1 sản phẩm
    public Product getOneProduct(int id);

}
