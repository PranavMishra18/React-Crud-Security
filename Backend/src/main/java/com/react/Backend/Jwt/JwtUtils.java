package com.react.Backend.Utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtils {

    private final String base64EncodedKey = "2e4a4ff3ee8801d20094041e12dbed4d1f2f6ac7fb095f03d70902c974567382a53c6d7a7a98962bc499c80ac59edfdd22f02e264f2b28d364327fdf133c90e4"; // Store securely
    private final SecretKey jwtSecretKey = Keys.hmacShaKeyFor(Base64.getDecoder().decode(base64EncodedKey));

    public String generateJwtToken(String email, String role) {
        long jwtExpirationMs = 900000; // 15 minutes

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(jwtSecretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    public String getEmailFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtSecretKey)
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("Token expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported token: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Malformed token: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("Token is null or empty: " + e.getMessage());
        }
        return false;
    }
}
