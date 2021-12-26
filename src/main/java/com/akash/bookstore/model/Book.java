package com.akash.bookstore.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "bookstore")
@Setter
@Getter
@NoArgsConstructor
@ToString
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long BookId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(name="cover_photo_url",nullable = false)
    private String coverPhotoURL;

    @Column(name="isbn_number",nullable = false)
    private Long isbnNumber;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private String genre;

    @Column(name = "publishedDate")

    private Date publishedDate;

    public Book(Long bookId, String title, String author, String coverPhotoURL, Long isbnNumber, Double price, String language, String genre, Date publishedDate) {
        BookId = bookId;
        this.title = title;
        this.author = author;
        this.coverPhotoURL = coverPhotoURL;
        this.isbnNumber = isbnNumber;
        this.price = price;
        this.language = language;
        this.genre = genre;
        this.publishedDate = publishedDate;
    }
}
