import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class Dictionary {
    private static Dictionary dictionary;
    private ArrayList<Word> list = null;

    public static Dictionary getInstance() {
        if(dictionary == null)
            try{
                dictionary.setList((ArrayList<Word>) SerializeFactory.getInstance().loadNotebook());
            } catch (IOException e) {
                dictionary = new Dictionary();
            }
        return dictionary;
    }

    private Dictionary() {
        list = new ArrayList<Word>();
    }

    public ArrayList<Word> getDictionary() {
        return this.list;
    }

    public void add(Word value) {
        list.add(value);
    }

    public void setList(ArrayList<Word> newList){
        list = newList;
    }

}
