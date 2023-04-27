#include <iostream>
#include <string>
#include <fstream>
#include <stack>

using namespace std;

struct Node
{
  string data;
  Node *prev;
  Node *next;
};

class Editor
{
private:
  Node *head;
  Node *tail;
  stack<string> uStack;
  stack<string> rStack;
  stack<string> tempS;

public:
  Editor()
  {
    head = nullptr;
    tail = nullptr;
  }
  void insert(string undo);
  void append(string undo);
  void replace(string undo, int, string);
  void input(string data);
  int search(string);
  void deleteData(string undo, int index);
  void print();
  void save();
  void readFile();
  void deleteFile();
  void createFile(string filename);
  void clear();
  void undo();
  void redo();
  void replaceString();
  void appendString();
  void deleteString();
  string genStr(int index);
};

void Editor::input(string data)
{
  Node *newNode = new Node;
  newNode->data = data;
  newNode->next = nullptr;
  if (head == nullptr)
  {
    newNode->prev = nullptr;
    head = newNode;
    tail = newNode;
  }
  else
  {
    newNode->prev = tail;
    tail->next = newNode;
    tail = newNode;
  }
}

void Editor::insert(string undo)
{
  int count = 0;
  string data;
  cout << "Enter multiple lines (type 'done' to finish):\n";
  while (true)
  {
    getline(cin, data);
    if (data == "done")
    {
      break;
    }
    count++;
    input(data);
  }
  if (undo == "0")
  {
    uStack.push(to_string(count));
    uStack.push("1");
  }
}

void Editor::append(string undo)
{
  int iter;
  int count = 0;
  int index;
  string line;
  int indexU;
  if (undo == "0" || undo == "2")
  {
    if (undo == "0")
    {
      cout << "Enter index: ";
      cin >> index;
      cin.ignore();
      cout << "Enter multiple lines (type 'done' to finish):\n";
    }
    else if (undo == "2")
    {
      index = stoi(rStack.top());
      rStack.pop();
      iter = stoi(rStack.top());
      rStack.pop();
    }

    indexU = index;
  }
  if (undo == "1")
  {
    index = stoi(uStack.top());
    uStack.pop();
    line = uStack.top();
    uStack.pop();
    rStack.push(to_string(index));
  };
  Node *curr = head;
  for (int i = 0; i < index && curr != nullptr; i++)
  {
    curr = curr->next;
  }
  Node *prev = curr != nullptr ? curr->prev : tail;

  while (true)
  {
    if (undo == "0")
    {
      getline(cin, line);
    }
    else if (undo == "2" && iter > 0)
    {
      line = rStack.top();
      rStack.pop();
      iter--;
    }
    if (line == "done")
    {
      break;
    }
    count++;
    Node *newNode = new Node;
    newNode->data = line;
    if (curr == nullptr)
    {
      if (prev != nullptr)
      {
        prev->next = newNode;
      }
      newNode->prev = prev;
      newNode->next = nullptr;
      tail = newNode;
      curr = newNode;
    }
    else if (curr == head)
    {
      newNode->prev = nullptr;
      newNode->next = curr;
      curr->prev = newNode;
      head = newNode;
    }
    else
    {
      newNode->prev = prev;
      newNode->next = curr;
      prev->next = newNode;
      curr->prev = newNode;
    }
    prev = newNode;
    line = "done";
  }
  if (undo == "0" || undo == "2")
  {
    uStack.push(to_string(count));
    uStack.push(to_string(indexU));
    uStack.push("3");
  }
}

void Editor::replace(string undo, int index = -1, string data = "")
{
  if (undo == "0")
  {
    cout << "enter index:";
    cin >> index;
    cin.ignore();
  }
  else if (undo == "1")
  {
    index = stoi(uStack.top());
    uStack.pop();
  }
  else if (undo == "2")
  {
    index = stoi(rStack.top());
    rStack.pop();
  }

  int indexUR = index;
  Node *curr = head;
  for (int i = 0; i < index && curr != nullptr; i++)
  {
    curr = curr->next;
  }
  if (curr == nullptr)
  {

    insert("0");
    return;
  }
  if (undo == "0" || undo == "3")
  {
    if (undo == "0")
    {
      cout << "enter string:";
      getline(cin, data);
    }
    string uData = curr->data;

    uStack.push(uData);
    uStack.push(to_string(indexUR));
    uStack.push("2");
  }
  else if (undo == "1")
  {
    rStack.push(curr->data);
    rStack.push(to_string(indexUR));
    rStack.push("2");
    data = uStack.top();
    uStack.pop();
  }
  else if (undo == "2")
  {
    string uData = curr->data;
    data = rStack.top();
    rStack.pop();
    uStack.push(uData);
    uStack.push(to_string(indexUR));
    uStack.push("2");
  }
  curr->data = data;
}

int Editor::search(string query)
{
  string str;
  int index = 0;
  bool found = false;
  Node *curr = head;
  while (curr != nullptr)
  {
    str = curr->data;
    size_t pos = str.find(query, 0);
    while (pos != string::npos)
    {

      found = true;
      cout << "Node " << index << " and position " << str.find(query) << endl;
      pos = str.find(query, pos + 1);
    }
    curr = curr->next;
    index++;
  }
  if (found)
  {
    return 1;
  }
  else
    return -1;
}

void Editor::deleteData(string undo, int index)
{
  if (undo == "0")
  {

    while (true)
    {
      string ans;
      cout << "Delete using (S)tring:" << endl;
      cout << "Delete using (I)ndex:" << endl;
      cout << "command (S/I):" << endl;
      cin >> ans;
      if (ans != "S" && ans != "s" && ans == "I" && ans == "i")
      {
        cout << "invalid response" << endl;
        continue;
      }
      else if (ans == "S" || ans == "s")
      {
        string query;
        cout << "enter query to be deleted" << endl;
        cin >> query;
        index = search(query);

        if (index == (-1))
        {
          cout << "query not found!!" << endl;
          return;
        }
      }

      cout << "Enter Index of node to be deleted:" << endl;
      cin >> index;
      break;
    }
  }
  int indexU = index;
  Node *curr = head;

  if (index >= 0 || index == -100)
    while (curr != nullptr)
    {
      if (index == -100)
      {
        index = 0;
        curr = tail;
      }

      if (index == 0)
      {

        if (curr == head)
        {
          head = curr->next;
        }
        if (curr == tail)
        {
          tail = curr->prev;
        }
        if (curr->prev != nullptr)
        {
          curr->prev->next = curr->next;
        }
        if (curr->next != nullptr)
        {
          curr->next->prev = curr->prev;
        }
        if (undo == "0" || undo == "2")
        {
          uStack.push(curr->data);
          uStack.push(to_string(indexU));
          uStack.push("4");
        }
        else if (undo == "1")
        {
          tempS.push(curr->data);
        }
        delete curr;
        if (undo == "0")
        {
          cout << "Node deleted" << endl;
        }
        return;
      }
      curr = curr->next;
      index--;
    }
}

void Editor::clear()
{
  while (head != nullptr)
  {
    Node *temp = head;
    head = head->next;
    delete temp;
  }
}

void Editor::save()
{
  string ans;
  string filename;
  cout << "enter filename to store data in:";
  cin >> filename;
  ifstream file(filename);
  if (!file.good())
  {
    cout << filename << " does not exist \n want to create a file named " << filename << "? (Y/N)" << endl;
    cin >> ans;
    while (true)
    {
      if (ans == "Y" || ans == "y")
      {
        createFile(filename);
        break;
      }
      else if (ans == "N" || ans == "n")
      {
        cout << "cannot save data as file does not exist" << endl;
        return;
      }
      else
      {
        cout << "invalid response" << endl;
      }
    }
  }

  ofstream outFile(filename);
  Node *current = head;
  while (current != nullptr)
  {
    outFile << current->data << '\n';
    current = current->next;
  }

  outFile.close();
};

void Editor ::createFile(string filename)
{
  if (filename == "need(0)")
  {
    cout << "enter filename:";
    cin >> filename;
  }
  ofstream file(filename);
  if (file.is_open())
  {
    cout << "File created successfully" << endl;
    file.close();
  }
  else
  {
    cout << "File creation failed" << endl;
  };
};

void Editor::readFile()
{

  string filename;
  cout << "enter filename:";
  cin >> filename;
  cin.ignore();
  ifstream file(filename);
  if (!file.is_open())
  {
    cout << "Error opening file!\n";
  }
  else
  {
    int choice;
    cout << "Do you want to open file as" << endl;
    cout << "1.Read-Only" << endl;
    cout << "2.read -write (will replace previous data from editor)" << endl;
    cout << "enter your choice:" << endl;
    cin >> choice;

    while (true)
    {
      if (choice == 1)
      {
        break;
      }
      else if (choice == 2)
      {
        clear();
        break;
      }
      else
      {
        cout << "invalid response" << endl;
      }
    }
    string line;
    while (getline(file, line))
    {
      cout << line << endl;
      if (choice == 2)
      {
        input(line);
      }
    }
    cout << "______________\n"
         << "press enter to end" << endl;
    cin.ignore();
    cin.get();
    file.close();
  }
}

void Editor::print()
{
  Node *curr = head;
  while (curr != nullptr)
  {
    cout << curr->data << endl;
    curr = curr->next;
  }
}

void Editor::deleteFile()
{
  string filename;
  cout << "Enter name of the file to delete:" << endl;
  cin >> filename;

  if (remove(filename.c_str()) != 0)
  {
    cout << "Deletion Error !!" << endl;
  }
  else
  {
    cout << "Deleted successfully" << endl;
  }
}

string Editor ::genStr(int index)
{
  string nodeData;
  Node *curr = head;
  while (curr != nullptr)
  {
    if (index == 0)
    {
      return curr->data;
    }
    curr = curr->next;
    index--;
  }

  return NULL;
}

void Editor::replaceString()
{
  int index;
  int pos;
  int len;
  string data;
  cout << "enter index of node :" << endl;
  cin >> index;
  cout << "enter position :" << endl;
  cin >> pos;
  cout << "enter span :" << endl;
  cin >> len;
  cout << "substring :" << endl;
  cin >> data;
  int length;
  string NodeData = genStr(index);
  data = NodeData.replace(pos, len, data);
  replace("3", index, data);
}

void Editor::appendString()
{
  int index;
  string data;
  cout << "enter index of node :" << endl;
  cin >> index;
  cout << "substring :" << endl;
  cin >> data;
  int length;
  string NodeData = genStr(index);
  data = NodeData.append(" " + data);
  replace("3", index, data);
}

void Editor::deleteString()
{
  int index;
  int pos;
  int len;
  string data;
  while (true)
  {
    string ans;
    cout << "Delete using (S)tring:" << endl;
    cout << "Delete using (I)ndex:" << endl;
    cout << "command (S/I):" << endl;
    cin >> ans;
    if (ans != "S" && ans != "s" && ans == "I" && ans == "i")
    {
      cout << "invalid response" << endl;
      continue;
    }
    else if (ans == "S" || ans == "s")
    {
      cout << "enter query to be deleted" << endl;
      cin >> data;
      index = search(data);

      if (index == (-1))
      {
        cout << "query not found!!" << endl;
        return;
      }
    }

    cout << "Enter Index of node to be deleted:" << endl;
    cin >> index;

    cout << "enter position :" << endl;
    cin >> pos;
    cout << "enter span :" << endl;
    if (ans == "S" || ans == "s")
    {
      len = data.length();
    }
    else
    {
      cout << "enter length :" << endl;
      cin >> len;
    }

    break;
  }

  int length;
  string NodeData = genStr(index);
  data = NodeData.replace(pos, len, "");
  replace("3", index, data);
}

void Editor ::undo()
{
  if (uStack.empty())
  {
    cout << "No undo available" << endl;
  }
  else
  {
    int iter;
    string rIter;
    int index;
    string rIndex;
    string data;
    int top = stoi(uStack.top());
    switch (top)
    {
    case 1:
      uStack.pop();
      iter = stoi(uStack.top());
      rIter = uStack.top();
      uStack.pop();
      while (iter > 0)
      {
        rStack.push(tail->data);
        deleteData("1", -100);
        iter--;
      }
      cout << "undo successful" << endl;
      rStack.push(rIter);
      rStack.push("1");

      break;

    case 2:
      uStack.pop();

      replace("1");
      cout << "undo successful" << endl;
      break;

    case 3:
      uStack.pop();
      rIndex = uStack.top();
      index = stoi(rIndex);
      uStack.pop();
      rIter = uStack.top();
      iter = stoi(rIter);
      uStack.pop();
      cout << index << endl;
      while (iter > 0)
      {
        deleteData("1", index);
        iter--;
      }
      cout << "undo successful" << endl;
      while (!tempS.empty())
      {
        rStack.push(tempS.top());
        tempS.pop();
      }

      rStack.push(rIter);
      rStack.push(rIndex);
      rStack.push("3");
      break;
    case 4:
      uStack.pop();
      append("1");
      cout << "undo successful" << endl;
      rStack.push("4");
      break;
    default:
      cout << "error" << endl;
    }
  }
}

void Editor ::redo()
{
  if (rStack.empty())
  {
    cout << "No redo available" << endl;
  }
  else
  {
    int iter;
    int index;
    string data;
    int top = stoi(rStack.top());
    switch (top)
    {
    case 1:
      rStack.pop();
      iter = stoi(rStack.top());
      rStack.pop();
      uStack.push(to_string(iter));
      uStack.push("1");
      while (iter > 0)
      {
        input(rStack.top());
        rStack.pop();
        iter--;
      }
      cout << "redo successfull" << endl;
      break;

    case 2:
      rStack.pop();
      replace("2");
      cout << "Redo Successful" << endl;
      break;

    case 3:
      rStack.pop();
      append("2");
      cout << "Redo Successful" << endl;
      break;

    case 4:
      rStack.pop();
      index = stoi(rStack.top());
      rStack.pop();
      deleteData("2", index);
      cout << "Redo Successful" << endl;
      break;

    default:
      cout << "error" << endl;
    }
  }
}

int main()
{
  Editor editor;
  char choice;
  string query;
  do
  {
    cout << endl;
    cout << "          _______________________________________________________________" << endl;
    cout << "          |-----------------------CUI TEXT EDITOR-----------------------|" << endl;
    cout << "          |_____________________________________________________________|" << endl;
    cout << "          |                     |                   |                   |" << endl;
    cout << "          | FILE COMMANDS:      | NODE COMMANDS:    | STRING COMMANDS:  |" << endl;
    cout << "          |                     |                   |                   |" << endl;
    cout << "          | (N)ew File          | 1.Insert Data     | 6.Search Data     |" << endl;
    cout << "          | (O)pen File         | 2.Update Data     | 7.Replace String  |" << endl;
    cout << "          | (S)ave to File      | 3.Append Data     | 8.Append String   |" << endl;
    cout << "          | (D)elete a file     | 4.Read Data       | 9.Delete String   |" << endl;
    cout << "          |                     | 5.Delete Data     |                   |" << endl;
    cout << "          | E(X)it              |                   | (U)ndo & (R)edo   |" << endl;
    cout << "          |_____________________|___________________|___________________|\n"
         << endl;
    cout << "Enter desired choice :" << endl;
    cin >> choice;
    cin.ignore();
    switch (choice)
    {
    case 'N':
    case 'n':
      editor.createFile("need(0)");
      break;

    case 'O':
    case 'o':
      editor.readFile();
      break;

    case 'S':
    case 's':
      editor.save();
      break;

    case 'D':
    case 'd':
      editor.deleteFile();
      break;

    case 'X':
    case 'x':
      cout << "BYE BYE Exiting... ";
      return 0;

    case 'U':
    case 'u':
      editor.undo();
      break;

    case 'R':
    case 'r':
      editor.redo();
      break;

    case '1':
      editor.insert("0");
      ;
      break;

    case '2':
      editor.replace("0");
      ;
      break;

    case '3':
      editor.append("0");
      ;
      break;

    case '4':
      editor.print();
      ;
      break;

    case '6':
      int ind;
      int pos;
      cout << "Enter query to search:";
      cin >> query;
      ind = editor.search(query);
      if (ind == 1)
      {
        cout << "Search complete" << endl;
      }
      else
      {
        cout << "Search not  found" << endl;
      }
      break;

    case '5':
      editor.deleteData("0", -100);
      break;

    case '7':
      editor.replaceString();
      break;

    case '8':
      editor.appendString();
      break;

    case '9':
      editor.deleteString();
      break;

    default:
      cout
          << "invalid input" << endl;
      break;
    }
  } while (true);
}