package com.akash.bookstore.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PageService<T>{
    Page<T> findAll(Pageable pageable, String searchText);
    Page<T> findAll(Pageable pageable);
}
