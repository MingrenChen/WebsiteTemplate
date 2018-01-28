import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.ArrayList;

public class SerializeFactory {
    private static SerializeFactory ourInstance = new SerializeFactory();

    public static SerializeFactory getInstance() {
        return ourInstance;
    }

    private SerializeFactory() {
    }

    public ArrayList<Word> loadData(){
        S
        try {
            for (int i=0;i<26;i++) {
                ObjectInputStream readInventory =
                        new ObjectInputStream(new FileInputStream("./dict/" + initial + ".out"));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
