import java.io.*;
import java.util.ArrayList;

public class SerializeFactory {
    private static SerializeFactory ourInstance = new SerializeFactory();

    public static SerializeFactory getInstance() {
        return ourInstance;
    }

    private SerializeFactory() {
    }

    public Object loadNotebook() throws IOException {
        try {
            ObjectInputStream readInventory =
                         new ObjectInputStream(new FileInputStream("./dict/notebook.out"));
            return readInventory.readObject();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void saveNotebook() throws IOException {
        ObjectOutputStream inventory = new
                ObjectOutputStream(new FileOutputStream("./dict/notebook.out"));
        inventory.writeObject(Notebook.getInstance().getNotebook());
        inventory.close();
    }








}
