package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.KnowledgeBaseArticle;
import com.examly.springapp.repository.KnowledgeBaseRepository;

@Service
public class KnowledgeBaseServiceImpl implements KnowledgeBaseService {

    private final KnowledgeBaseRepository kbRepository;

    public KnowledgeBaseServiceImpl(KnowledgeBaseRepository kbRepository) {
        this.kbRepository = kbRepository;
    }

    @Override
    public List<KnowledgeBaseArticle> getAllArticles() {
        return kbRepository.findAll();
    }

    @Override
    public KnowledgeBaseArticle addArticle(KnowledgeBaseArticle article) {
        return kbRepository.save(article);
    }
}
