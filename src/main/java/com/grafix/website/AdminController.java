package com.grafix.website;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final ProductService productService;
    private final ReviewService reviewService;
    private final BlogService blogService;
    private final SubscriberService subscriberService;
    private final ContactService contactService;

    public AdminController(ProductService productService, ReviewService reviewService,
            BlogService blogService, SubscriberService subscriberService,
            ContactService contactService) {
        this.productService = productService;
        this.reviewService = reviewService;
        this.blogService = blogService;
        this.subscriberService = subscriberService;
        this.contactService = contactService;
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("productCount", productService.getAllProducts().size());
        model.addAttribute("reviewCount", reviewService.getAllReviews().size());
        model.addAttribute("postCount", blogService.getAllPosts().size());
        model.addAttribute("subscriberCount", subscriberService.getAllSubscribers().size());
        model.addAttribute("messageCount", contactService.getAllMessages().size());
        return "admin-dashboard";
    }

    @GetMapping("/subscribers")
    public String listSubscribers(Model model) {
        model.addAttribute("subscribers", subscriberService.getAllSubscribers());
        return "admin-subscribers";
    }

    @GetMapping("/reviews/delete/{id}")
    public String deleteReview(@PathVariable String id) {
        reviewService.deleteReview(id);
        return "redirect:/admin/reviews";
    }

    // Product Management
    @GetMapping("/products")
    public String listProducts(Model model) {
        model.addAttribute("products", productService.getAllProducts());
        return "admin-products";
    }

    @GetMapping("/products/delete/{id}")
    public String deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return "redirect:/admin/products";
    }

    @GetMapping("/add-product")
    public String showAddProductForm(Model model) {
        model.addAttribute("product", new Product());
        return "add-product";
    }

    @PostMapping("/add-product")
    public String addProduct(@ModelAttribute Product product, @RequestParam("imageFile") MultipartFile imageFile) {
        if (!imageFile.isEmpty()) {
            try {
                String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
                Path path = Path.of("uploads/" + fileName);
                Files.createDirectories(path.getParent());
                Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                product.setImageUrl("/uploads/" + fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        productService.addProduct(product);
        return "redirect:/admin/products";
    }

    // Blog Management
    @GetMapping("/blog")
    public String listBlogPosts(Model model) {
        model.addAttribute("posts", blogService.getAllPosts());
        return "admin-blog";
    }

    @GetMapping("/blog/add")
    public String showAddBlogForm(Model model) {
        model.addAttribute("post", new BlogPost());
        return "add-blog";
    }

    @PostMapping("/blog/add")
    public String addBlogPost(@ModelAttribute BlogPost post, @RequestParam("imageFile") MultipartFile imageFile) {
        if (!imageFile.isEmpty()) {
            try {
                String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
                Path path = Path.of("uploads/" + fileName);
                Files.createDirectories(path.getParent());
                Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                post.setImageUrl("/uploads/" + fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        blogService.addPost(post);
        return "redirect:/admin/blog";
    }

    @GetMapping("/blog/delete/{id}")
    public String deleteBlogPost(@PathVariable String id) {
        blogService.deletePost(id);
        return "redirect:/admin/blog";
    }

    @GetMapping("/messages")
    public String listMessages(Model model) {
        model.addAttribute("messages", contactService.getAllMessages());
        return "admin-messages";
    }

    @GetMapping("/messages/delete/{id}")
    public String deleteMessage(@PathVariable String id) {
        contactService.deleteMessage(id);
        return "redirect:/admin/messages";
    }
}
