import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class Dictionary {
    private static HashMap<String, ArrayList<Word>> dict = null;

    private Dictionary() {
        if (dict == null) {

            dict = new HashMap<String, ArrayList<Word>>();
        }
    }

}
