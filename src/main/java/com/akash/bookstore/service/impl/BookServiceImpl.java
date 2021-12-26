package com.akash.bookstore.service.impl;

import com.akash.bookstore.model.Book;
import com.akash.bookstore.repository.BookRepository;
import com.akash.bookstore.service.PageService;
import com.akash.bookstore.service.Service;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.Optional;

@org.springframework.stereotype.Service
public class BookServiceImpl implements Service<Book>, PageService<Book> {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Collection<Book> findAll() {
        return (Collection<Book>) bookRepository.findAll();
    }

    @Override
    public Page<Book> findAll(Pageable pageable, String searchText) {
        return bookRepository.findAllBooks(pageable,searchText);
    }

    @Override
    public Page<Book> findAll(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    @Override
    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book saveOrUpdate(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try{
            bookRepository.deleteById(id);
            jsonObject.put("message","Book deleted Successfully");
        }catch (JSONException e){
            e.printStackTrace();
        }

        return jsonObject.toString();
    }
}
