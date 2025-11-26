document.addEventListener('DOMContentLoaded', () => {
    const blogList = document.getElementById('blog-list');
    const postContent = document.getElementById('post-content');

    // Check if we are on the blog list page
    if (blogList) {
        fetchPosts();
    }

    // Check if we are on the single post page
    if (postContent) {
        loadSinglePost();
    }

    const defaultPosts = [
        {
            "id": 1,
            "title": "Understanding Harmonic Patterns in Forex Trading",
            "excerpt": "Harmonic patterns are geometric price structures that can help traders identify potential reversals. Learn the basics of Gartley, Butterfly, and Bat patterns.",
            "content": "<p>Harmonic trading combines patterns and math into a trading method that is precise and based on the premise that patterns repeat themselves. Harmonic trading attempts to predict future movements.</p><img src=\"assets/scanner-mockup.png\" alt=\"Harmonic Pattern Example\" style=\"width: 100%; border-radius: 8px; margin: 20px 0;\"><h3>The Gartley Pattern</h3><p>The Gartley pattern is the oldest recognized harmonic pattern. It was developed by H.M. Gartley. It is a retracement pattern that usually indicates a continuation of the overall trend.</p><h3>The Butterfly Pattern</h3><p>The Butterfly pattern is a reversal pattern often found at market extremes. It helps traders identify the end of a price movement.</p>",
            "date": "2025-11-20",
            "author": "FxMath Team",
            "image": "assets/blog-1.jpg"
        },
        {
            "id": 2,
            "title": "Top 5 Benefits of Automated Trading Scanners",
            "excerpt": "Why spend hours staring at charts when a scanner can do it for you? Discover how automated tools can improve your trading efficiency and accuracy.",
            "content": "<p>Automated trading scanners are essential tools for modern traders. They scan the markets 24/7, identifying opportunities that human eyes might miss.</p><ul><li><strong>Efficiency:</strong> Scanners can monitor hundreds of assets simultaneously.</li><li><strong>Emotion-Free:</strong> Automated tools remove emotional bias from trading decisions.</li><li><strong>Speed:</strong> Detect patterns the instant they form.</li></ul>",
            "date": "2025-11-15",
            "author": "FxMath Team",
            "image": "assets/blog-2.jpg"
        },
        {
            "id": 3,
            "title": "Risk Management Strategies for Harmonic Traders",
            "excerpt": "Protecting your capital is just as important as making profits. Explore key risk management techniques tailored for harmonic pattern trading.",
            "content": "<p>Effective risk management is the cornerstone of successful trading. When trading harmonic patterns, it's crucial to set proper Stop Loss and Take Profit levels.</p><p>Always use a risk-to-reward ratio of at least 1:2. This ensures that your winning trades can cover your losing ones.</p>",
            "date": "2025-11-10",
            "author": "FxMath Team",
            "image": "assets/blog-3.jpg"
        }
    ];

    function fetchPosts() {
        fetch('blog.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(posts => {
                renderBlogList(posts);
            })
            .catch(error => {
                console.warn('Error loading blog posts, using default:', error);
                renderBlogList(defaultPosts);
            });
    }

    function renderBlogList(posts) {
        blogList.innerHTML = '';
        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'blog-card glass-card';
            card.innerHTML = `
                <div class="blog-image">
                    <img src="${post.image}" alt="${post.title}" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="far fa-calendar"></i> ${post.date}</span>
                        <span><i class="far fa-user"></i> ${post.author}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="post.html?id=${post.id}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            blogList.appendChild(card);
        });
    }

    function loadSinglePost() {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id'));

        if (!postId) {
            postContent.innerHTML = '<p class="error-msg">Invalid post ID.</p>';
            return;
        }

        fetch('blog.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(posts => {
                const post = posts.find(p => p.id === postId);
                if (post) {
                    renderSinglePost(post);
                } else {
                    postContent.innerHTML = '<p class="error-msg">Post not found.</p>';
                }
            })
            .catch(error => {
                console.warn('Error loading post, using default:', error);
                const post = defaultPosts.find(p => p.id === postId);
                if (post) {
                    renderSinglePost(post);
                } else {
                    postContent.innerHTML = '<p class="error-msg">Post not found.</p>';
                }
            });
    }

    function renderSinglePost(post) {
        postContent.innerHTML = `
            <div class="post-header">
                <h1>${post.title}</h1>
                <div class="blog-meta">
                    <span><i class="far fa-calendar"></i> ${post.date}</span>
                    <span><i class="far fa-user"></i> ${post.author}</span>
                </div>
            </div>
            <div class="post-image-large">
                <img src="${post.image}" alt="${post.title}" onerror="this.src='https://via.placeholder.com/800x400?text=No+Image'">
            </div>
            <div class="post-body">
                ${post.content}
            </div>
        `;
    }
});
