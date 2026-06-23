package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.KnowledgeBaseArticle;

public interface KnowledgeBaseService {
    List<KnowledgeBaseArticle> getAllArticles();
    KnowledgeBaseArticle addArticle(KnowledgeBaseArticle article);
}
