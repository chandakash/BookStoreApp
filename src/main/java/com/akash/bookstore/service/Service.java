package com.akash.bookstore.service;

import java.util.Collection;
import java.util.Optional;

public interface Service<T>{
    Collection<T> findAll();

    Optional<T> findById(Long id);

    T saveOrUpdate(T t);
    String deleteById(Long id);

}
