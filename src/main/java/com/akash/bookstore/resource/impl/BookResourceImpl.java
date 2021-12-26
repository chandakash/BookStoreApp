package com.akash.bookstore.resource.impl;

import com.akash.bookstore.model.Book;
import com.akash.bookstore.resource.Resource;
import com.akash.bookstore.service.PageService;
import com.akash.bookstore.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookResourceImpl implements Resource<Book> {

    @Autowired
    private Service<Book> bookService;

    @Autowired
    private PageService<Book> bookPageService;

    @Override
    public ResponseEntity<Page<Book>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return new ResponseEntity<>(bookPageService.findAll(
                PageRequest.of(pageNumber,pageSize,sortDir.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending())
        ), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Page<Book>> findAll(Pageable pageable, String searchText) {
        return new ResponseEntity<>(bookPageService.findAll(pageable,searchText),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Book> findById(Long id) {
        return new ResponseEntity<>(bookService.findById(id).get(),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Book> save(Book book) {
        return new ResponseEntity<>(bookService.saveOrUpdate(book),HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Book> update(Book book) {
        return new ResponseEntity<>(bookService.saveOrUpdate(book),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        return new ResponseEntity<>(bookService.deleteById(id),HttpStatus.OK);
    }

    @GetMapping("/languages")
    public  ResponseEntity<Set<String>> findAllLanguages() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("French", "Portuguese", "English", "Russian", "Hindi", "Arabic", "Spanish", "Chinese")), HttpStatus.OK);
    }

    @GetMapping("/genres")
    public  ResponseEntity<Set<String>> findAllGenres() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Technology", "Science", "History", "Fantasy", "Biography", "Horror", "Romance")), HttpStatus.OK);
    }
}
