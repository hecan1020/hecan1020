---
title: 面试题收集-Java基础
author: 白米粥
category: ["面试"]
star: true
---

<!-- more -->
## 1、Java是什么？JDK和JRE有什么区别？
```
Java是一种广泛使用的编程语言和计算机平台，被广泛用于开发Web应用、桌面应用、移动
应用、嵌入式系统等各种类型的软件。Java语言具有跨平台性、面向对象、安全性、可靠性等特点。

JDK是Java Development Kit的缩写，是Java开发工具包的意思。JDK是用于开发Java程序的软件包，包含了Java编译器、Java运行时环境、Java文档和一些Java工具。JDK是Java应用程序开发的必备工具。
JRE是Java Runtime Environment的缩写，是Java运行时环境的意思。JRE包含了Java虚拟机和Java程序所需的库文件，用于运行Java应用程序。JRE不包含Java编译器和开发工具，因此无法用于开发Java应用程序。
简而言之，JDK是用于开发Java程序的工具包，而JRE是用于运行Java程序的环境。
```
## 2、面向对象都有哪些特性
```
封装（Encapsulation）：将数据和操作封装在一个对象中，以保护数据不被外部直接访问和修改，只能通过对象提供的接口来访问和修改数据。
继承（Inheritance）：子类可以从父类继承属性和方法，可以复用已有的代码，减少重复代码的编写。
多态（Polymorphism）：同一种类型的对象在不同的情况下可以表现出不同的行为，可以提高代码的灵活性和可扩展性。
抽象（Abstraction）：将对象的共同特征提取出来，形成一个抽象的类或接口，以实现代码的重用和灵活性。
```
## 3、Java访问权限public/privated/protected有什么区别，不写的话是什么?
```
public：公共访问权限，可以被任何类访问。
private：私有访问权限，只能在定义该变量或方法的类中被访问，其他任何类都无法访问。
protected：受保护的访问权限，可以被该类及其子类和同一包中的其他类访问。
默认访问权限：如果没有指定访问权限控制符，即不写任何控制符，那么该变量或方法就是默认访问权限，只能被同一包中的其他类访问。

在实际开发中，应该根据实际需要选择适当的访问权限控制符。如果一个变量或方法需要在多个类中使用，可以使用public权限控制符。如果一个变量或方法只需要在当前类中使用，可以使用private权限控制符。如果需要在当前类及其子类中使用，可以使用protected权限控制符。如果不想让其他类访问，但是需要在同一包中的其他类中使用，可以使用默认访问权限。
```
## 4、Java clone是什么？
```
在Java中，对象的clone()方法用于创建一个对象的副本，即在内存中重新创建一个与原对象具有相同状态的对象。这个方法是Object类中的一个方法，但是如果需要进行复制操作，需要确保被复制的类实现了Cloneable接口，否则会抛出CloneNotSupportedException异常。

clone()方法返回的是一个Object类型的对象，因此需要进行类型转换。如果一个类要实现克隆，必须满足以下条件：

1.类实现Cloneable接口，表明该类可以被克隆。

2.类必须重写Object类中的clone()方法，并且访问修饰符不能为private。

在进行对象克隆时，使用clone()方法创建的对象是一个全新的对象，与原来的对象完全独立，对新对象进行的修改不会影响原对象，反之亦然。但是需要注意的是，如果被克隆的对象中包含了其他对象的引用，这些引用仍然指向原来的对象，而不是克隆出来的新对象，因此需要特殊处理。
```
## 5、Java中深拷贝和浅拷贝
```
Java中的对象拷贝有两种方式：深拷贝和浅拷贝。
1.浅拷贝（Shallow Copy）：浅拷贝是指只复制对象本身，而不会复制对象内部包含的引用对象。也就是说，复制的对象和原对象共享内部对象的引用。  
2.深拷贝（Deep Copy）：深拷贝是指完全复制一个对象及其内部所有的引用对象，即创建一个全新的对象，与原对象完全独立。也就是说，复制的对象和原对象不共享任何内部对象的引用。
```
::: details 示例代码
::: tabs
@tab 浅拷贝示例代码
``` java
public class Person implements Cloneable {
    public String name;
    public List<String> hobbies;
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

Person person1 = new Person();
person1.name = "Tom";
person1.hobbies = new ArrayList<String>();
person1.hobbies.add("reading");

Person person2 = (Person) person1.clone();
person2.hobbies.add("swimming");

System.out.println(person1.hobbies); // 输出：[reading, swimming]
System.out.println(person2.hobbies); // 输出：[reading, swimming]
// 在上面的示例中，person2的hobbies列表发生了变化，但是person1的hobbies列表也随之发生了变化，这是因为person1和person2共享了同一个hobbies对象的引用，导致对其中一个对象进行修改时，另一个对象也会跟着发生变化。
```
@tab 深拷贝示例代码
``` java
public class Person implements Cloneable {
    public String name;
    public List<String> hobbies;
    public Object clone() throws CloneNotSupportedException {
        Person person = (Person) super.clone();
        person.hobbies = new ArrayList<String>();
        for (String hobby : this.hobbies) {
            person.hobbies.add(hobby);
        }
        return person;
    }
}
Person person1 = new Person();
person1.name = "Tom";
person1.hobbies = new ArrayList<String>();
person1.hobbies.add("reading");
Person person2 = (Person) person1.clone();
person2.hobbies.add("swimming");
System.out.println(person1.hobbies); // 输出：[reading]
System.out.println(person2.hobbies); // 输出：[reading, swimming]
// 在上面的示例中，person1和person2的hobbies列表互不影响，因为person2的hobbies列表是一个全新的对象，与person1的hobbies列表完全独立。
```
:::
## 6、在Java中，可以用哪些方式调用类的构造方法
```
1.new 关键字：使用new关键字创建对象时，会自动调用构造方法。
2.反射：使用Java反射机制，可以动态地调用类的构造方法。
```
::: details 示例代码
::: tabs
@tab new关键字调用
```java
public class Person {
    private String name;
    private int age;
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
Person person = new Person("Tom", 20);
```
@tab 反射方式调用
```java
public class Person {
    private String name;
    private int age;
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
Class<?> clazz = Class.forName("Person");
Constructor<?> constructor = clazz.getConstructor(String.class, int.class);
Person person = (Person) constructor.newInstance("Tom", 20);

```
:::
## 7、单个类的实例化顺序?如果有继承关系呢？
``` 
在Java中，当创建一个类的对象时，其实例化的顺序是比较固定的，具体如下：
1.静态变量和静态代码块按照在代码中出现的顺序依次执行。静态变量和静态代码块的执行是在类被加载的时候进行的，只会执行一次。
2.实例变量和实例代码块按照在代码中出现的顺序依次执行。实例变量和实例代码块的执行是在每次创建对象时都会执行的，且在构造方法之前执行。
3.构造方法会在实例变量和实例代码块执行完毕后执行。

当存在继承关系时，类的实例化顺序如下：
1.父类的静态变量和静态代码块按照在代码中出现的顺序依次执行。
2.子类的静态变量和静态代码块按照在代码中出现的顺序依次执行。
3.父类的实例变量和实例代码块按照在代码中出现的顺序依次执行。
4.父类的构造方法执行。
5.子类的实例变量和实例代码块按照在代码中出现的顺序依次执行。
6.子类的构造方法执行。
```