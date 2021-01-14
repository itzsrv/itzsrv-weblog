---
title: Understanding Java Memory Model and JVM Technology
cover: ./java-7.jpg
date: 2020-07-12
description: 
tags: ['post', 'java']
draft: false
---

**JVM** requires some memory for its functioning and this is consumed from available memory on underlying OS. This can be managed programmatically by providing memory switches in startup parameters to jvm. Inside JVM, there exist separate memory spaces **(Heap, Non-Heap, and Cache)** in order to store runtime data and compiled code.

![java-memory](./jvm-mem.png)

- In the image shown above for Java Memory Model:
  - Heap Space: Eden + Survivor + Tenured
  - Non-Heap Space: Stack + MetaSpace + Reserved (Not shown here)
  - Cache


#### Heap Memory

This is the place where objects live. Prior to Java 8, we have Permanent Generation also as part of Heap Space. But Java 8 onwards, this has been replaced with a non-heap memory named as MetaSpace. With Java 8, Heap Space is divided into below two parts:

- #### Young Generation
The Young Generation is the place where all the new objects are created. When this young generation is filled, garbage collection is performed. This garbage collection is called Minor GC. Young Generation is divided into three parts – **Eden and two Survivor(S1, S2) Memory Spaces**. All newly created objects are placed in the Eden Space. 

- #### Old Generation
Objects that survive multiple cycles of GC, are moved to the Old Generation Memory Space, also known as **Tenured Space**. Usually, it’s done by setting a threshold (-XX:MaxTenuringThreshold) for the age of the young generation objects before they become eligible to be promoted to old generation.

>
Followings are some JVM memory configurations when running resource-intensive Java programs.
- -Xms`value` - Sets the minimum or initial Heap size
- -Xmx`value` - Sets the maximum Heap size (def: 256m) The -Xmx option is equivalent to -XX:MaxHeapSize.
- -Xmn`value` - Sets the initial and maximum size (in bytes) of the heap for the young generation, rest of the space goes for old generation. Instead of the -Xmn option to set both the initial and maximum size of the heap for the young generation, you can use -XX:NewSize to set the initial size and -XX:MaxNewSize to set the maximum size.
- -XX:NewSize=`size` - Sets the new generation heap size
- -XX:MaxNewSize=`size` - Sets the maximum new generation heap size
- -XX:PermSize=`size` - Sets the space (in bytes) allocated to the permanent generation
- -XX:MaxPermSize=`size` - Sets the maximum permgen space size (in bytes). This option was deprecated in JDK 8, and superseded by the -XX:MaxMetaspaceSize option.
- -XX:SurvivorRatio=`value` - Sets new heap size ratios (e.g. if Young Gen size is 10m and memory switch is –XX:SurvivorRatio=2, then 5m will be reserved for Eden space and 2.5m each for both Survivor spaces, def: 8)
- -XX:NewRatio=`value` - Sets ratio of Old/New Gen sizes (def: 2, means 2/3 of memory for Old, 1/3 for Young)
- -XX:MaxTenuringThreshold=`value` - Sets GC threshold for promoting to Old Generation (max: 15). The default value is 15 for the parallel (throughput) collector, and 6 for the CMS collector. 



#### Non Heap Memory
The memory that doesn't belong to Heap Area, is informally referred as Non-Heap Memory. This area includes **Stack** and **MetaSpace**.


- #### Stack
This memory is used for execution of a thread and it contains method specific values and references to other objects in Heap.

- #### MetaSpace

  From Java 8 onwards, Permanent Generation has been replaced with MetaSpace, which is a non-heap memory. MetaSpace holds the reflective data of JVM itself, like Class Loader related data, Class metadata, methods and more.

  MetaSpace is not a contiguous memory and can auto increase its size up to the limit that underlying OS allows, whereas Perm Gen always has a fixed maximum size. As long as the classloader is alive, the metadata remains alive in the Metaspace and can’t be freed.

- #### Reserved Space
  Jvm has its some reserved memory space for unforeseen situations.

#### Code Cache

  Code Cache is cache memory, that is used for the storage of compiled native codes generated by JIT compiler, JVM internal structures, loaded profiler agent code and data, etc.

---


#### Java Virtual Machine Technology

The JDK provides one or more implementations of the Java™ Virtual Machine (JVM):  
- On platforms typically used for client applications, the JDK comes with a VM implementation called the Java HotSpot™ Client VM (client VM). The client VM is tuned for reducing start-up time and memory footprint. It can be invoked by using the -client command-line option when launching an application.
- On all platforms, the JDK comes with an implementation of the Java virtual machine called the Java HotSpot Server VM (server VM). The server VM is designed for maximum program execution speed. It can be invoked by using the -server command-line option when launching an application.
Some features of Java HotSpot technology, common to both VM implementations, are the following.

  - Adaptive compiler - Applications are launched using a standard interpreter, but the code is then analyzed as it runs to detect performance bottlenecks, or "hot spots". The Java HotSpot VMs compile those performance-critical portions of the code for a boost in performance, while avoiding unnecessary compilation of seldom-used code (most of the program). The Java HotSpot VMs also use the adaptive compiler to decide, on the fly, how best to optimize compiled code with techniques such as in-lining. The runtime analysis performed by the compiler allows it to eliminate guesswork in determining which optimizations will yield the largest performance benefit.
  - Rapid memory allocation and garbage collection - Java HotSpot technology provides for rapid memory allocation for objects, and it offers a choice of fast, efficient, state-of-the-art garbage collectors.
  - Thread synchronization - The Java programming language allows for use of multiple, concurrent paths of program execution (called "threads"). Java HotSpot technology provides a thread-handling capability that is designed to scale readily for use in large, shared-memory multiprocessor servers.

#### Brief overview of Hotspot JVM Architecture:

![java-hotspot](./java-hotspot.png)


>
##### References: 
>
- Orcale JDK Documentations
>
Few More Important Resources that can be checked out:
   - [Table for Oracle JavaSE VM Options (SE 7 and Earlier)](https://www.oracle.com/java/technologies/javase/vmoptions-jsp.html)
   - [All Java Hotspot VM command line flags for Java 8](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html)
   - [All Java Hotspot VM command line flags for Java 7](https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html)
   - [JDK 14 Documentation](https://docs.oracle.com/en/java/javase/14/)
