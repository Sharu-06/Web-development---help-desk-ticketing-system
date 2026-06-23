package com.examly.springapp.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.KnowledgeBaseArticle;
import com.examly.springapp.service.KnowledgeBaseService;

@RestController
@RequestMapping("/api/kb")
public class KnowledgeBaseController {

    private final KnowledgeBaseService kbService;

    public KnowledgeBaseController(KnowledgeBaseService kbService) {
        this.kbService = kbService;
    }

    @GetMapping
    public ResponseEntity<List<KnowledgeBaseArticle>> getAllArticles() {
        return ResponseEntity.ok(kbService.getAllArticles());
    }

    @PostMapping
    public ResponseEntity<KnowledgeBaseArticle> addArticle(@RequestBody KnowledgeBaseArticle article) {
        return ResponseEntity.ok(kbService.addArticle(article));
    }
}
