export class Article {
    constructor(id = "", title = "", content = "", image = "", author = "", authorImage = "", date = "") {
        this.id = id;
        this.title = title;
        this.content = content;
        this.image = image;
        this.author = author;
        this.authorImage = authorImage;
        this.date = date;
    }
}