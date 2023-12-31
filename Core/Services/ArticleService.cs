using Infrastructure;
using Infrastructure.Models;

namespace Core.Services;

public class ArticleService
{
    private readonly ArticleRepository _articleRepository;
    private readonly List<string> _validAuthors = new() {"Rob", "Bob", "Dob", "Lob"};

    public ArticleService(ArticleRepository articleRepository)
    {
        _articleRepository = articleRepository;
    }
    
    public Article Get(int id)
    {
        return _articleRepository.Get(id);
    }
    
    
    public IEnumerable<NewsFeedItem> GetFeed()
    {
        return _articleRepository.GetFeed();
    }
    
    public IEnumerable<SearchArticleItem> Search(string query, int page, int pageSize)
    {
        if (pageSize < 1)
        {
            throw new ArgumentException("Page size must be greater than 0");
        }

        if (query.Length < 3)
        {
            throw new ArgumentException("Search term must be at least 3 characters long");
        }
        
        return _articleRepository.Search(query, page, pageSize);
    }
    
    public Article Create(CreateArticleRequestDto articleDto)
    {
        if (!_validAuthors.Contains(articleDto.Author)) throw new ArgumentException("Author is not valid");
        
        try
        {
            return _articleRepository.Create(articleDto);
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception.Message);
            throw new Exception("Could not create article");
        }
    }
    
    public Article Update(int id, UpdateArticleRequestDto articleDto)
    {
        if (!_validAuthors.Contains(articleDto.Author)) throw new ArgumentException("Author is not valid");

        return _articleRepository.Update(id, articleDto);
    }
    
    public void Delete(int id)
    {
        _articleRepository.Delete(id);
    }
}