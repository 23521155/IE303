package com.edu.auth_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "credentials")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Credential {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   private String email;
   private String password;
   private Long userId;
}
