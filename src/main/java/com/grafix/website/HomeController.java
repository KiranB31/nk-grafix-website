package com.grafix.website;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import java.util.UUID;

@Controller
public class HomeController {

    private final ProductService productService;
    private final BlogService blogService;
    private final ReviewService reviewService;
    private final SubscriberService subscriberService;
    private final ContactService contactService;

    public HomeController(ProductService productService, BlogService blogService,
            ReviewService reviewService, SubscriberService subscriberService,
            ContactService contactService) {
        this.productService = productService;
        this.blogService = blogService;
        this.reviewService = reviewService;
        this.subscriberService = subscriberService;
        this.contactService = contactService;
    }

    @PostMapping("/subscribe")
    @ResponseBody
    public String subscribe(@RequestParam String email) {
        subscriberService.addSubscriber(email);
        return "Success";
    }

    @GetMapping("/")
    public String index(org.springframework.ui.Model model) {
        model.addAttribute("products", productService.getAllProducts());
        model.addAttribute("recentPosts",
                blogService.getAllPosts().subList(0, Math.min(2, blogService.getAllPosts().size())));
        return "index";
    }

    @GetMapping("/reviews/add")
    public String showReviewForm(org.springframework.ui.Model model) {
        model.addAttribute("review", new Review());
        return "add-review";
    }

    @org.springframework.web.bind.annotation.PostMapping("/reviews/add")
    public String addReview(@org.springframework.web.bind.annotation.ModelAttribute Review review) {
        reviewService.addReview(review);
        return "redirect:/?success=true";
    }

    @GetMapping("/admin/reviews")
    public String listReviews(org.springframework.ui.Model model) {
        model.addAttribute("reviews", reviewService.getAllReviews());
        return "admin-reviews";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/blog")
    public String blog(org.springframework.ui.Model model) {
        model.addAttribute("posts", blogService.getAllPosts());
        return "blog";
    }

    @GetMapping("/products")
    public String products(org.springframework.ui.Model model) {
        model.addAttribute("products", productService.getAllProducts());
        return "products";
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }

    @GetMapping("/contact")
    public String contact(Model model) {
        model.addAttribute("contactMessage", new ContactMessage());
        return "contact";
    }

    @PostMapping("/contact")
    public String submitContact(@ModelAttribute ContactMessage contactMessage) {
        contactService.addMessage(contactMessage);
        return "redirect:/contact?success=true";
    }
}
