# Cypto Casino One

# Smart Contract API

### Адреса

<aside>
#️⃣ *USDT* `[0x0D9B2BA8A6CF4f7dFd4d9F83563094C477dC6c95 ](https://testnet.bscscan.com/address/0x0D9B2BA8A6CF4f7dFd4d9F83563094C477dC6c95 )`
*PLAY TOKEN* `[0x94e4e454fD3126C5f982ddfaA5c1EE2d38FB257D ](https://testnet.bscscan.com/address/0x94e4e454fD3126C5f982ddfaA5c1EE2d38FB257D )`
*EXCHANGE* `[0x2763B1A9Ff780824a5EDdd68D9A06562De8e8C3E](https://testnet.bscscan.com/address/0x2763B1A9Ff780824a5EDdd68D9A06562De8e8C3E)`
*REFSTORAGE* `[0xfC7D40303e3B8E203C3BDaEc4953a7Ba7af3EE26](https://testnet.bscscan.com/address/0xfC7D40303e3B8E203C3BDaEc4953a7Ba7af3EE26)`
*X2PLAY* `[0xE3412Dc33D1EBAfA0ab3307f32f36108662D6257](https://testnet.bscscan.com/address/0xE3412Dc33D1EBAfA0ab3307f32f36108662D6257)`
</aside>

### NOTES

<aside>

1. на BSC в USDT 18 знаков после запятой, в нашем токене (PLAY) я также сделал 18 знаков чтобы привести в соответствие с USDT.

2. на BSC в USDT нет ограничения с изменением одобренного количества токенов. Здесь отсутствует проблема двойных аппрувов через 0. Напомню что в прошлой версии чтобы изменить approve 100 на approve 200, надо было сначала вызвать approve 0, а затем approve 200.

3. Реферер указателя при покупке PLAY в контракте Exchange.  После того как реферер однажды указан, он неизменяем в контракте. Р еферер единый для всей сети контрактов (всех версий игр).  Дальнейшие проекты (по типу NFT допустим) можно также привязывать к данной реферальной системе. Все данные о рефке хранятся на отдельном смарт-контракте (RefStorage). Р еферальная глубина неограниченна.
При этом запросы о реферальной программе направляются в смарт контракты обменника и игр, запросы об общих реферальных данных же направляются в смарт контракт RefStorage.  

</aside>

### Learn

<aside>

💡 [Подключение сети BSC в Metamask](https://academy.binance.com/ru/articles/connecting-metamask-to-binance-smart-chain) | [Тестовый эксплорер](https://testnet.bscscan.com/) | [Получить тестовые BNB](https://testnet.binance.org/faucet-smart)

</aside>

# `BEP20 Token Contract (USDT/PLAY)`

### BEP20 Balance

- Method ABI

    ```jsx
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
    ```

---

### BEP20 Approve

- Method ABI

    ```tsx
    {
    		"constant": false,
    		"inputs": [
    			{
    				"internalType": "address",
    				"name": "spender",
    				"type": "address"
    			},
    			{
    				"internalType": "uint256",
    				"name": "amount",
    				"type": "uint256"
    			}
    		],
    		"name": "approve",
    		"outputs": [],
    		"payable": false,
    		"stateMutability": "nonpayable",
    		"type": "function"
    	}
    ```

---

### BEP20 Transfer

- Method ABI

    ```tsx
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
    ```

---

# `EXCHANGE CONTRACT`

### **EXCHANGE USDT to PLAY**

Обмен USDT на PLAY

Примечание: перед вызовом юзеру необходимо сделать approve USDT (в контракте USDT) на адрес EXCHANGE

`from` - Адрес пользователя
`amount` - сумма USDT к обмену
`referrer` - Адрес реферера

- Method ABI

    ```tsx
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			}
		],
		"name": "exchangeUsdtToPlay",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
    ```

---

### **EXCHANGE PLAY to USDT**

Обмен PLAY на USDT совершается одной транзакцией путем отправки PLAY на адрес EXCHANGE (функция bep20 transfer в контракте PLAY TOKEN)

---

### **GET REFERRER INFO**

Реферальная информация:
Реферер пользователя
Собственная реферальная ставка (указывается с двумя знаками после запятой)
Количество рефералов
Сумма заработанных бонусов

- Method ABI

    ```tsx
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getReferrerInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalGames",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalBets",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalProfit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalWithdrawn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalWithdrawable",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
    ```

---

### **GET REFERRAL INFO**

2. Запрос списка рефералов:
Список адресов рефералов
Бонус по каждому

- Method ABI

    ```tsx
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "from",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "to",
				"type": "uint256"
			}
		],
		"name": "getReferralInfo",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "referrals",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "bonuses",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
    ```

---

### **GET REFERRAL RATE**

Собственная реферальная ставка (указывается с двумя знаками после запятой)

- Method ABI

    ```tsx
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getReferralRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
    ```

---


# `X2PLAY CONTRACT`

### **СДЕЛАТЬ СТАВКУ**

Ставка совершается одной транзакцией путем отправки PLAY на адрес X2PLAY (функция bep20 transfer в контракте PLAY TOKEN)

---

### **GET USER INFO**

Общая информация:
Количество раундов в которых участвовал игрок
Общая прибыль игрока
Сумма выведенных средств
Сумма доступная к выводу

- Method ABI

    ```tsx
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getUserInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "rate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "referrals",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bonuses",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
    ```

---

### **GET ROUND INFO**

Информация по каждому раунду участника:
Цикл игры
Номер раунда
Количество сделанных ставок
Дата игры (старт и финиш UNIX time)
Количество участников в целом
Результат игры участника (если известен)

- Method ABI

    ```tsx
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "from",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "to",
				"type": "uint256"
			}
		],
		"name": "getUserGames",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "cycle",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "round",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "bets",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "start",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "finish",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "totalUsers",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "profit",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
    ```

---

### **GET GAME INFO**

Общая информация:
Цикл
Номер раунда
Количество ставок в целом
Количество игроков в целом
Объем раунда
Заполнено
Свободно

- Method ABI

    ```tsx
	{
		"constant": true,
		"inputs": [],
		"name": "getGameInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "cycle",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "round",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bets",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "players",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "volume",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "filled",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "available",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
    ```

---

### **AVAILABLE PROFIT**

Доступная к выводу прибыль

- Method ABI

    ```tsx
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "getWithdrawable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "withdrawable",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
    ```

---

### **WITHDRAW**

Вывести прибыль

- Method ABI

    ```tsx
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
    ```

---

### **REINVEST**

Реинвестировать прибыль

- Method ABI

    ```tsx
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "reinvest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
    ```

---
