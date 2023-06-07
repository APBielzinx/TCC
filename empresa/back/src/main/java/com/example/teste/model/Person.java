package com.example.teste.model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Table(name = "Pessoa")
@Entity
public class Person {

     @jakarta.persistence.Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long Id;
     @Column(nullable = false)
     private String Email;
     @Column(nullable = false)
     private Date Date;
     @Column(nullable = false)
     private int EmailEnviado;


     public Person() {
     }

     public Person(Long id, String email, Date date, int emailEnviado) {
          Id = id;
          Email = email;
          Date = date;
          EmailEnviado = emailEnviado;
     }

     public Long getId() {
          return Id;
     }


     public String getEmail() {
          return Email;
     }

     public void setEmail(String email) {
          Email = email;
     }

     public Date getDate() {
          return Date;
     }

     public void setDate(Date date) {
          this.Date = date;
     }

     public int getEmailEnviado() {
          return EmailEnviado;
     }

     public void setEmailEnviado(int emailEnviado) {
          EmailEnviado = emailEnviado;
     }

     @Override
     public String toString() {
          return "Person{" +
                  "Id=" + Id +
                  ", Email='" + Email + '\'' +
                  ", Date='" + Date + '\'' +
                  ", EmailEnviado=" + EmailEnviado +
                  '}';
     }
}
