---
title: Godot-rust Addon jetzt für Godot 4
description: Das godot-rust addon hat eine neue Version veröffentlicht
date: "2022-11-11 00:00:00"
---
<sup>von: ARez - 11 November 2022</sup>


## Einführung
Rust ist eine relativ neue Sprache (erste stabile Version 2015), welche ähnlich wie C++ als "System-level" Sprache bezeichnet wird. Ein Vorteil von Rust gegenüber C++ ist die quasi-garantierte Speichersicherheit, welche durch ein prüfen bei Compile-time erreicht wird. Es gibt dadurch also keine Performance-Nachteile.

Rust als Sprache selber ist also sehr schnell und wird seit neuestem von großen Firmen wie Dropbox, Microsoft, Facebook, Amazon und auch Discord verwendet. Selbst der neue Linux Kernel soll in Rust geschrieben werden!

Nun gibt es, wie sicher Viele wissen, mehrere Optionen um in Godot Code zu schreiben. Als Standard wird oft GDScript angesehen, allerdings stehen auch C# oder C++ zur Auswahl. Dies war in Godot 3 durch `GDNative` möglich. Für Godot 4 wird dieses System überarbeitet und zu `GDExtension` umbenannt.


## Godot-rust
Das `godot-rust` Projekt stellt eine Rust-basierte API für GDNative beziehungsweise nun auch GDExtension bereit. Das heißt, dass man Funktionen von der Godot API von Rust aus ansteuern kann. Dadurch hat man alle Vorteile der Rust Sprache und kann trotzdem mit Godot arbeiten. Natürlich kann man dadurch auch Performance Vorteile gegenüber GDScript herausholen, allerdings sollte man dafür versuchen so viel wie möglich mit Rust-nativen Lösungen zu arbeiten, denn ansonsten würde man einfach nur die C API von Godot Aufrufen, was GDScript am Ende auch macht.


Seit dem 6.11.2022 gibt es die neue `godot-rust` version welche zeigt, wie die neue GDExtension API wahrscheinlich genutzt werden wird. Dabei ist zu beachten, dass diese Version noch sehr früh in ihrer Entwicklung ist und nur die wichtigsten Klassen der GDExtension API implementiert hat. Als Beispiel hat der Haupt-Autor von `godot-rust` das "Dodge-the-creeps" Beispiel implementiert. Den Link zum Ordner im Github Repository findet ihr [hier](https://github.com/godot-rust/gdextension/tree/master/examples/dodge-the-creeps).


Das ganze Projekt ist komplett Open Source und teilt sich in zwei verschiedene Github Repositories auf. Eins für [GDNative](https://github.com/godot-rust/godot-rust) und eins für [GDExtension](https://github.com/godot-rust/gdextension). 

Wenn das ganze euch interessiert könnt ihr euch [das Buch/ die Dokumentation für GDNative](https://godot-rust.github.io/book/introduction.html) anschauen. Für die neue GDExtension Version gibt es dieses Buch zum jetzigen Zeitpunkt noch nicht, es wird aber sicher bald folgen.

Das Projekt hat auch einen Discord Server. Den Einladungslink dazu findet ihr [hier](https://discord.gg/aKUCJ8rJsc)