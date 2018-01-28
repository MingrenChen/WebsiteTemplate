import java.io.Serializable;

public class Word implements Serializable{

    private static final long serialVersionUID = 1057457982;

    private String defination;

    private boolean ignored = false;

    private WordViewed viewd = null;

    private String text;

    public Word(String text, String defination){
        this.text = text;
        this.defination = defination;
    }
    public String getText() {
        return text;
    }

    public String getDefination() {
        return defination;
    }

    public boolean isIgnored() {
        return ignored;
    }

    void setIgnored(boolean ignored) {
        this.ignored = ignored;
    }

    public WordViewed getViewd() {
        return viewd;
    }

    public void view() {
        this.viewd = new WordViewed(this);
    }

    public boolean equals(Word other) {
        return text.equals(other.getText());
    }
}
