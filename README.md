# IBL Guarulhos - Sistema de Membresia

> Sistema completo de gestão de membros e Grupos Conectados (GCs) da Igreja Batista Lagoinha de Guarulhos.

## 🚀 Início Rápido

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🏗️ Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL)
- **Styling**: Sass + Styled Components
- **Maps**: Leaflet + React Leaflet
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

## 📋 Funcionalidades

### ✅ Implementadas

- [x] Sistema de autenticação (Supabase Auth)
- [x] Cadastro de membros com upload de documentos
- [x] Gestão completa de GCs (CRUD)
- [x] Dashboard administrativo
- [x] Mapa interativo de GCs
- [x] Sistema de busca por GCs próximos
- [x] Responsividade completa
- [x] Validação de formulários
- [x] Compressão automática de imagens

### 🔄 Em Desenvolvimento

- [ ] Relatórios avançados
- [ ] Sistema de notificações
- [ ] API para integração externa
- [ ] Testes automatizados

## 🌐 Estrutura

```
src/
├── components/         # Componentes reutilizáveis
├── pages/             # Páginas da aplicação
├── services/          # Camada de serviços/API
├── hooks/             # Custom hooks
├── types/             # Tipos TypeScript
├── utils/             # Funções utilitárias
└── styles/            # Estilos globais
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_supabase
VITE_TURSO_DATABASE_URL=sua_url_turso (opcional)
VITE_TURSO_AUTH_TOKEN=seu_token_turso (opcional)
```

### Supabase Setup

1. **Criar Projeto** no Supabase
2. **Executar SQLs** das tabelas (ver DOCUMENTATION.md)
3. **Configurar RLS** (Row Level Security)
4. **Criar Bucket** `documents` no Storage

## 📊 Principais Componentes

### Gestão de Membros

- **MembershipForm**: Formulário completo de cadastro
- **MembersList**: Lista e gestão de membros
- **MemberDetailsModal**: Visualização detalhada

### Gestão de GCs

- **GCList**: Lista e gestão de GCs
- **NewGC**: Criação de novos GCs
- **EditGC**: Edição de GCs existentes
- **GCMap**: Visualização no mapa

### Sistema Base

- **Modal**: Sistema de modais reutilizável
- **FileUpload**: Upload com drag & drop
- **AddressForm**: Formulário de endereço com CEP
- **Dashboard**: Painel administrativo

## 🔐 Autenticação

Sistema baseado em Supabase Auth:

```typescript
// Hook de autenticação
const { login, logout, user, isAuthenticated } = useAuth()

// Login
await login(email, password)

// Logout
await logout()
```

## 📱 Responsividade

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: até 767px

## 🧪 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview da build
npm run lint         # Linting
```

## 📚 Documentação

Para documentação completa, consulte [DOCUMENTATION.md](./DOCUMENTATION.md):

- Arquitetura detalhada
- Modelo de dados
- Guias de configuração
- APIs e serviços
- Deploy e produção

## 🤝 Contribuição

1. Fork do projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'feat: nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Pull Request

## 📄 Licença

Projeto de uso interno da Igreja Batista Lagoinha de Guarulhos.

---

**Versão**: 1.0.0  
**Última atualização**: Janeiro 2025
