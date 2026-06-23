import React, { useState } from "react";
import { Box, Typography, TextField, Button, List, ListItem } from "@mui/material";

export default function KnowledgeBase() {
  const [articles, setArticles] = useState([
    "How to reset your password",
    "Troubleshooting network issues",
    "Installing company software",
  ]);
  const [newArticle, setNewArticle] = useState("");

  const handleAdd = () => {
    if (newArticle.trim() !== "" && !articles.includes(newArticle)) {
      setArticles([...articles, newArticle]);
      setNewArticle("");
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Knowledge Base Articles
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="New Article Title"
          value={newArticle}
          onChange={(e) => setNewArticle(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Box>
      <List>
        {articles.map((article, i) => (
          <ListItem key={i}>{article}</ListItem>
        ))}
      </List>
    </Box>
  );
}
