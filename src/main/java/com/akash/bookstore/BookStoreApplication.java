package com.akash.bookstore;

import com.akash.bookstore.model.Book;
import com.akash.bookstore.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookStoreApplication implements CommandLineRunner {

    @Autowired
    private Service<Book> bookService;

    public static void main(String[] args) {
        SpringApplication.run(BookStoreApplication.class, args);
        System.out.println("Book SpringBOOT Started .....");
    }


    @Override
    public void run(String... args) throws Exception {
       /* if (roleService.findAll().isEmpty()) {
            roleService.saveOrUpdate(new Role(ConstantUtils.ADMIN.toString()));
            roleService.saveOrUpdate(new Role(ConstantUtils.USER.toString()));
        }

        if (userService.findAll().isEmpty()) {
            User user1 = new User();
            user1.setEmail("test@user.com");
            user1.setName("Test User");
            user1.setMobile("9787456545");
            user1.setRole(roleService.findByName(ConstantUtils.USER.toString()));
            user1.setPassword(new BCryptPasswordEncoder().encode("testuser"));
            userService.saveOrUpdate(user1);

            User user2 = new User();
            user2.setEmail("test@admin.com");
            user2.setName("Test Admin");
            user2.setMobile("9787456545");
            user2.setRole(roleService.findByName(ConstantUtils.ADMIN.toString()));
            user2.setPassword(new BCryptPasswordEncoder().encode("testadmin"));
            userService.saveOrUpdate(user2);
        }*/

        if (bookService.findAll().isEmpty()) {
            for (int i = 1; i <= 10; i++) {
                Book book = new Book();
                book.setTitle("Spring Microservices in Action " + i);
                book.setAuthor("John Carnell " + i);
                book.setCoverPhotoURL(
                        "https://images-na.ssl-images-amazon.com/images/I/417zLTa1uqL._SX397_BO1,204,203,200_.jpg");
                book.setIsbnNumber(1617293989L);
                book.setPrice(2776.00 + i);
                book.setLanguage("English");
                book.setGenre("Technology");
                bookService.saveOrUpdate(book);
            }
        }
    }

}
