import { NbMenuItem } from '@nebular/theme';



export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'MENU',
    group: true,
  },
  {
    title: 'Administrar',
    icon: 'person',
    children: [
      { icon: 'people',
        title: 'Usuarios',
        link: '/pages/administrar/administrar-usuarios',
        
      },
      { icon: 'book-open',
        title: 'Cursos',
        link: '/pages/administrar/administrar-cursos',
      },
      { icon: 'layers',
        title: 'Asignaturas',
        link: '/pages/administrar/administrar-asignaturas',
      },
      { icon: 'flash',
        title: 'Logros',
        link: '/pages/administrar/administrar-logros',
      },
    ],
  },
  {
    title: 'Admisión',
    icon: 'clipboard',
    children: [
      {
        icon: 'file-text',
        title: 'Enviar Formulario',
        link: '/pages/admision/admision-formulario',
      }
    ],
  },
  {
    title: 'Admisión',
    icon: 'clipboard',
    children: [
      { icon: 'calendar',
        title: 'Horario de Atención',
        link: '/pages/secretaria/admision-horario',
      },
      { icon: 'person',
        title: 'Crear Usuario',
        link: '/pages/secretaria/crearusuario',
      },
      { icon: 'book-open',
        title: 'Asignar Cursos',
        link: '/pages/secretaria/asignarcursos',
      },
      { icon: 'edit',
        title: 'Registrar Nota',
        link: '/pages/secretaria/registrarnota',
      },
      { icon: 'cloud-upload',
        title: 'Hoja de Matricula',
        link: '/pages/secretaria/Formato',
      },
      { icon: 'unlock',
        title: 'Pago de Matricula',
        link: '/pages/secretaria/menupago',
      },
    ],
  },
  {
    title: 'Consultar',
    icon: 'question-mark-circle',
    children: [
      { icon: 'eye',
        title: 'Info Estudiantes',
        link: '/pages/secretaria/descargarinfo',
      },
      { icon: 'folder',
        title: 'Ver Documentos',
        link: '/pages/secretaria/verDocumentos',
      },
      { icon: 'file',
        title: 'Hoja de Matricula',
        link: '/pages/secretaria/MenuFormato',
      }
    ],
  },
  {
    title: 'Observaciones',
    icon: 'alert-circle',
    children: [
      { icon:'eye',
        title: 'Ver',
        link: '/pages/comite/observaciones-ver',
      },
      { icon:'plus-square',
        title: 'Agregar',
        link: '/pages/comite/observaciones-add',
      },
      { icon:'edit',
        title: 'Editar',
        link: '/pages/comite/observaciones-edit',
      },
    ],
  },
  {
    title: 'Gestionar Notas',
    icon: 'edit',
    children: [
      { icon: 'flash',
        title: 'Asignar logros',
        link: '/pages/docente/Asignarlogros',
      },
      { icon: 'edit',
        title: 'Gestionar Notas',
        link: '/pages/docente/Notas',
      },
      { icon: 'activity',
        title: 'Promoción de Alumnos',
        link: '/pages/docente/Promocion',
      }
    ],
  },
  {
    title: 'Reportar Fallas',
    icon: 'alert-triangle',
    children: [
      { icon: 'alert-triangle',
        title: 'Reportar Fallas',
        link: '/pages/docente/Fallas',
      }
    ],
  },
  {
    title: 'Consultar',
    icon: 'eye',
    children: [
      { icon:'slash',
        title: 'Fallas',
        link: '/pages/estudiante/Consultarfallas',
      },
      { icon:'alert-circle',
        title: 'Observaciones',
        link: '/pages/estudiante/Consultarobservaciones',
      },
      { icon:'edit',
        title: 'Notas',
        link: '/pages/estudiante/Consultarnotas',
      }
    ],
  },
  {
    title: 'Generar Reportes',
    icon: 'file-text',
    children: [
      { icon: 'file-text',
        title: 'Boletines',
        link: '/pages/docente/Reportes',
      }
    ],
  },
];
