
import java.time.LocalTime;

public class WordViewed {

    private int numOfViewed = 0;

    private int correct = 0;

    private LocalTime lastViewed;

    private Word word;

    WordViewed(Word word){
        lastViewed = LocalTime.now();
        this.word = word;
    }

    public void Know(){
        numOfViewed ++;
        correct ++;
        lastViewed = LocalTime.now();
    }

    public void Unknown(){
        numOfViewed ++;
        lastViewed = LocalTime.now();
        addToNotebook();
    }

    public void setIgnore(){
        word.setIgnored(true);
    }

    public int getNumOfViewed() {
        return numOfViewed;
    }


    public int getCorrect() {
        return correct;
    }

    public LocalTime getLastViewed() {
        return lastViewed;
    }

    public void addToNotebook(){
        Notebook.getInstance().add(this);
    }


}
