export class Article {
    constructor(id = "", title = "", content = "", imagePath = "", author = "", authorImage = "", date = "") {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imagePath = imagePath;
        this.author = author;
        this.authorImage = authorImage;
        this.date = date;
    }
}