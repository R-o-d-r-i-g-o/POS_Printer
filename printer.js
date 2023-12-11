import {
  BluetoothManager,
  BluetoothEscposPrinter,
} from 'react-native-bluetooth-escpos-printer';

import SunmiPrinter from '@heasy/react-native-sunmi-printer';

const PrinterPaymentMachine = async historyCalcs => {
  // await SunmiPrinter.printColumnsString(['últimos calculos'], [1], [1]);

  const myText = `Os Padrões de Projeto Gang of Four (GoF) são um conjunto de 23 padrões de design de software que foram apresentados no livro "Design Patterns: Elements of Reusable Object-Oriented Software". Este livro foi escrito por Erich Gamma, Richard Helm, Ralph Johnson e John Vlissides, conhecidos como o "Gang of Four" (GoF). Os padrões de design fornecem soluções para problemas comuns que surgem durante o desenvolvimento de software.`;

  const myText2 = `Padrões de Criação
  Singleton (Único): Garante que uma classe tenha apenas uma instância e fornece um ponto global para acessá-la.
  Factory Method (Método de Fábrica): Define uma interface para criar um objeto, mas deixa as subclasses alterarem o tipo de objetos que serão criados.
  Abstract Factory (Fábrica Abstrata): Fornece uma interface para criar famílias de objetos relacionados ou dependentes sem especificar suas classes concretas.
  Builder (Construtor): Separa a construção de um objeto complexo da sua representação, de modo que o mesmo processo de construção possa criar diferentes representações.
  Prototype (Protótipo): Cria novos objetos pela cópia de um objeto existente, conhecido como protótipo.`;

  const myText3 = `Padrões de Estrutura
  Adapter (Adaptador): Permite que a interface de uma classe existente seja usada como interface para outra interface esperada.
  Bridge (Ponte): Separa uma abstração de sua implementação, de modo que as duas possam variar independentemente.
  Composite (Composto): Compõe objetos em estruturas de árvore para representar hierarquias de parte-todo.
  Decorator (Decorador): Atribui responsabilidades adicionais a um objeto de maneira dinâmica. Os decoradores fornecem uma alternativa flexível à subclasse para estender funcionalidades.
  Facade (Fachada): Fornece uma interface unificada para um conjunto de interfaces em um subsistema. Simplifica o uso de um sistema complexo.`;

  const myText4 = `Padrões de Comportamento
  Observer (Observador): Define uma dependência um-para-muitos entre objetos, de modo que quando um objeto muda de estado, todos os seus dependentes são notificados e atualizados automaticamente.
  Strategy (Estratégia): Define uma família de algoritmos, encapsula cada um deles e os torna intercambiáveis. Permite que o algoritmo varie independentemente dos clientes que o utilizam.
  Command (Comando): Encapsula uma solicitação como um objeto, permitindo parametrizar clientes com diferentes solicitações, enfileirar solicitações e oferecer suporte a operações desfazer.
  Chain of Responsibility (Corrente de Responsabilidade): Passa solicitações ao longo de uma cadeia de manipuladores. Cada manipulador decide processar a solicitação ou passá-la para o próximo na cadeia.
  State (Estado): Permite que um objeto altere seu comportamento quando seu estado interno muda. O objeto parecerá ter mudado de classe.`;

  const myText5 = `Padrões de Outros Tipos
  Template Method (Método de Modelo): Define o esqueleto de um algoritmo na superclasse, mas permite que as subclasses alterem etapas específicas do algoritmo sem alterar sua estrutura.
  Memento (Memorando): Captura e externaliza um estado interno de um objeto, de modo que o objeto possa ser restaurado para esse estado mais tarde.
  Interpreter (Intérprete): Define uma gramática para as linguagens interpretadas e fornece um interpretador para interpretar as sentenças dessa linguagem.
  Visitor (Visitante): Representa uma operação a ser executada nos elementos de uma estrutura de objeto. Permite definir uma nova operação sem alterar as classes dos elementos sobre os quais opera.`;

  // historyCalcs.forEach(async value => {
  await SunmiPrinter.printerText(myText);
  await SunmiPrinter.lineWrap(1);

  await SunmiPrinter.printerText(myText2);
  await SunmiPrinter.lineWrap(1);

  await SunmiPrinter.printerText(myText3);
  await SunmiPrinter.lineWrap(1);

  await SunmiPrinter.printerText(myText4);
  await SunmiPrinter.lineWrap(1);

  await SunmiPrinter.printerText(myText5);

  // });

  await SunmiPrinter.lineWrap(5);
};

const Printer = async (historyCalcs: Array<string>) => {
  if (true) {
    await PrinterPaymentMachine(historyCalcs);
    return;
  }

  // para impressora externa:

  const tagInfo = await BluetoothManager.scanDevices();

  console.log('o que veio ', tagInfo);

  const devices = await JSON.parse(tagInfo);

  console.log(
    'oq veio',
    await BluetoothManager.scanDevices(),
    devices.found,
    BluetoothEscposPrinter,
  );

  const firstDevice = devices.found[0];

  console.log('dispositivo ', firstDevice);

  await BluetoothManager.connect(firstDevice.address)
    .then(o => console.log('conectou com ', o))
    .catch(e => console.log('caiu no erro ', e));

  console.log('dever ter conectado já');

  // await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER);
  // await BluetoothEscposPrinter.setBold(0);
  await BluetoothEscposPrinter.printText('MY LOVED TITLE\n\r', {
    encoding: 'GBK',
    codepage: 0,
    widthtimes: 3,
    heigthtimes: 3,
    fonttype: 1,
  });
};

export default Printer;
